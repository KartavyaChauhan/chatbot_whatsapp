import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestDto: CreateRequestDto) {
    try {
      console.log('Creating request with data:', createRequestDto);
      const result = await this.prisma.requests.create({
        data: {
          guestPhone: createRequestDto.guestPhone,
          requestText: createRequestDto.requestText,
          status: 'pending',
        },
      });
      console.log('Request created:', result);
      return result;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error; // Re-throw to see the full error in logs
    }
  }

  async findAll() {
    return this.prisma.requests.findMany({
      where: { status: 'pending' },
    });
  }
}
