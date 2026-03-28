import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private prismaService: PrismaService) {}

  async create(createVideoInput: CreateVideoInput) {
    return this.prismaService.video.create({
      data: {
        description: createVideoInput.description,
        name: createVideoInput.name,
        slug: createVideoInput.slug,
        channelId: createVideoInput.channelId
      }
    });
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoInput: UpdateVideoInput) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
