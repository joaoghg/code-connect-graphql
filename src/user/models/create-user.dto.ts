/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  password: string;
}
