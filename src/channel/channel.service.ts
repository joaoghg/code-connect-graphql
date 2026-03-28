import { Injectable } from '@nestjs/common';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelService {
  constructor(private prismaService: PrismaService) {}

  async create(createChannelInput: CreateChannelInput, userId: string) {
    return await this.prismaService.channel.create({
      data: {
        name: createChannelInput.name,
        description: createChannelInput.description,
        userId: userId
      }
    });
  }

  async findAll() {
    return await this.prismaService.channel.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.channel.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateChannelInput: UpdateChannelInput) {
    return await this.prismaService.channel.update({
      where: { id },
      data: {
        name: updateChannelInput.name,
        description: updateChannelInput.description
      }
    });
  }

  async remove(id: string) {
    return await this.prismaService.channel.delete({
      where: { id }
    });
  }
}
