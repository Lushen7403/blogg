import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080', // Địa chỉ của frontend (ví dụ: Vue.js chạy ở http://localhost:8080)
    credentials: true,  // Bật để gửi cookie trong các yêu cầu cross-origin
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
