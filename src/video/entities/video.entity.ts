import { ObjectType, Field } from '@nestjs/graphql';
import { Channel } from 'src/channel/entities/channel.entity';
import { VideoStatus } from 'src/generated/prisma/enums';

@ObjectType()
export class Video {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  slug: string;
  @Field(() => String)
  channelId: string;
  @Field(() => String)
  status: VideoStatus;
  @Field(() => Channel, { nullable: true })
  channel: Channel;
  @Field(() => String)
  publicUrl: string;
}
