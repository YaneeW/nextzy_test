import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api') // set ให้ path ขึ้นต้นด้วย api ทั้งหมด
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on ${process.env.PORT}`)
}
bootstrap();
