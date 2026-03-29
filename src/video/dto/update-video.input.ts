import { VideoStatus } from 'src/generated/prisma/enums';
import { CreateVideoInput } from './create-video.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => String)
  videoId: string;
  @Field(() => String)
  status: VideoStatus;
}
