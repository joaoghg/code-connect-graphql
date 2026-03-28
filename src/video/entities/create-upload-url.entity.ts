import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUploadUrl {
  @Field(() => String)
  videoId: string;
  @Field(() => String)
  url: string;
}
