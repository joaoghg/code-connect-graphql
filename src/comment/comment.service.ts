import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { JwtPayload } from 'src/auth/auth.types';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommentInput: CreateCommentInput, user: JwtPayload) {
    return await this.prismaService.comment.create({
      data: {
        content: createCommentInput.content,
        userId: user.sub,
        videoId: createCommentInput.videoId
      }
    });
  }

  async findAll() {
    return await this.prismaService.comment.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.comment.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateCommentInput: UpdateCommentInput) {
    return await this.prismaService.comment.update({
      where: { id },
      data: {
        content: updateCommentInput.content
      }
    });
  }

  async delete(id: string) {
    return await this.prismaService.comment.delete({
      where: { id }
    });
  }

  async getUser(userId: string) {
    return await this.prismaService.user.findUnique({
      where: { id: userId }
    });
  }
}
