import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import type { JwtPayload } from 'src/auth/auth.types';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Channel)
  createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
    @CurrentUser() user: JwtPayload
  ) {
    return this.channelService.create(createChannelInput, user.sub);
  }

  @Query(() => [Channel], { name: 'channel' })
  findAll() {
    return this.channelService.findAll();
  }

  @Query(() => Channel, { name: 'channel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.findOne(id);
  }

  @Mutation(() => Channel)
  updateChannel(@Args('updateChannelInput') updateChannelInput: UpdateChannelInput) {
    return this.channelService.update(updateChannelInput.id, updateChannelInput);
  }

  @Mutation(() => Channel)
  removeChannel(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.remove(id);
  }
}
