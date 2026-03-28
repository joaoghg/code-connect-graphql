import { ObjectType, Field, Int } from '@nestjs/graphql';

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
  createdAt: string;
  @Field(() => String)
  updatedAt: string;
}
