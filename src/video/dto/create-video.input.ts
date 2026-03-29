import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  channelId: string;
  @Field(() => String)
  filename: string;
}
