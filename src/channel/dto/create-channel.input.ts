import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
}
