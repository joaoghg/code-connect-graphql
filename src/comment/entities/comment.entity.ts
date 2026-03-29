import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Video } from 'src/video/entities/video.entity';

@ObjectType()
export class Comment {
  @Field(() => String)
  id: string;
  @Field(() => String)
  content: string;
  @Field(() => String)
  userId: string;
  @Field(() => String)
  videoId: string;
  @Field(() => User)
  user: User;
  @Field(() => Video)
  video: Video;
}
