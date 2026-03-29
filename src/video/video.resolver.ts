import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { CreateUploadUrl } from './entities/create-upload-url.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Channel } from 'src/channel/entities/channel.entity';

@UseGuards(AuthGuard)
@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => CreateUploadUrl)
  createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
  }

  @Query(() => [Video])
  videos(@Args('channelId') channelId: string) {
    return this.videoService.findAll(channelId);
  }

  @Query(() => Video)
  video(@Args('id') id: string) {
    return this.videoService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput.videoId, updateVideoInput.status);
  }

  @ResolveField(() => Channel)
  channel(@Parent() video: Video) {
    return this.videoService.findChannelFrom(video.channelId);
  }

  @ResolveField(() => String)
  publicUrl(@Parent() video: Video) {
    return this.videoService.getVideoPublicUrl(video.slug);
  }
}
