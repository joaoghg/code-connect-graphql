import { Injectable } from '@nestjs/common';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelService {
  constructor(private prismaService: PrismaService) {}

  create(createChannelInput: CreateChannelInput, userId: string) {
    return this.prismaService.channel.create({
      data: {
        name: createChannelInput.name,
        description: createChannelInput.description,
        userId: userId
      }
    });
  }

  findAll() {
    return this.prismaService.channel.findMany();
  }

  findOne(id: string) {
    return this.prismaService.channel.findUnique({
      where: { id }
    });
  }

  update(id: string, updateChannelInput: UpdateChannelInput) {
    return this.prismaService.channel.update({
      where: { id },
      data: {
        name: updateChannelInput.name,
        description: updateChannelInput.description
      }
    });
  }

  remove(id: string) {
    return this.prismaService.channel.delete({
      where: { id }
    });
  }
}
