import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ChannelModule } from './channel/channel.module';
import { VideoModule } from './video/video.module';
import { SupabaseModule } from './supabase/supabase.module';
import { CommentModule } from './comment/comment.module';
import { PubsubModule } from './pubsub/pubsub.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({}),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true
      }
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
    AuthModule,
    ChannelModule,
    VideoModule,
    SupabaseModule,
    CommentModule,
    PubsubModule
  ]
})
export class AppModule {}
