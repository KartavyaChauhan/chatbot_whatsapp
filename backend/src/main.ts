import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow these methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
  });
  await app.listen(3001, '0.0.0.0');
}
bootstrap();


