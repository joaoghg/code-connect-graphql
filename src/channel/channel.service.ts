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
    return `This action returns all channel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelInput: UpdateChannelInput) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
