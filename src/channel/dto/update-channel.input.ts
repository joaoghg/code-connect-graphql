import { CreateChannelInput } from './create-channel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelInput extends PartialType(CreateChannelInput) {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
}
