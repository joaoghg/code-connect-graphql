import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { randomUUID } from 'crypto';
import { VideoStatus } from 'src/generated/prisma/enums';

@Injectable()
export class VideoService {
  constructor(
    private prismaService: PrismaService,
    private supabaseService: SupabaseService
  ) {}

  async create(createVideoInput: CreateVideoInput) {
    const slug = `${createVideoInput.channelId}/${randomUUID()}/${createVideoInput.filename}`;

    const video = await this.prismaService.video.create({
      data: {
        description: createVideoInput.description,
        name: createVideoInput.name,
        slug: slug,
        channelId: createVideoInput.channelId
      }
    });

    const signedUrl = await this.supabaseService.createSignedUploadUrl(slug);

    return { videoId: video.id, url: signedUrl.signedUrl };
  }

  async update(videoId: string, status: VideoStatus) {
    return await this.prismaService.video.update({
      where: {
        id: videoId
      },
      data: {
        status: status
      }
    });
  }

  async findAll(channelId: string) {
    return await this.prismaService.video.findMany({
      where: {
        channelId: channelId
      }
    });
  }

  async findOne(id: string) {
    return await this.prismaService.video.findUnique({
      where: {
        id: id
      }
    });
  }

  async findChannelFrom(channelId: string) {
    return await this.prismaService.channel.findUnique({
      where: {
        id: channelId
      }
    });
  }

  getVideoPublicUrl(slug: string) {
    return this.supabaseService.createPublicUrl(slug);
  }
}
