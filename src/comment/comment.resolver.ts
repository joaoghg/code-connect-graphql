import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from 'src/user/entities/user.entity';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { PubSub } from 'graphql-subscriptions';

@UseGuards(AuthGuard)
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: JwtPayload
  ) {
    const comment = await this.commentService.create(createCommentInput, user);
    await this.pubSub.publish('commentCreated', { commentCreated: comment });
    return comment;
  }

  @Query(() => [Comment])
  comments() {
    return this.commentService.findAll();
  }

  @Query(() => Comment)
  comment(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(updateCommentInput.commentId, updateCommentInput);
  }

  @Mutation(() => Comment)
  deleteComment(@Args('id') id: string) {
    return this.commentService.delete(id);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment) {
    return this.commentService.getUser(comment.userId);
  }

  @Subscription(() => Comment, {
    filter: (payload: { commentCreated: Comment }, variables: { videoId: string }) => {
      return payload.commentCreated.videoId === variables.videoId;
    }
  })
  commentCreated(@Args('videoId') videoId: string) {
    return this.pubSub.asyncIterableIterator('commentCreated');
  }
}
