import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { Prisma } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RequestsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
