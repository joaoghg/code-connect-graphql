import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Channel {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
}
