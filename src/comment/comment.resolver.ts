import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/auth/auth.types';
import { UpdateCommentInput } from './dto/update-comment.input';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard)
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: JwtPayload
  ) {
    return this.commentService.create(createCommentInput, user);
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
}
