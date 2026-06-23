import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Allow all origins for local testing (including 10.5.0.2)
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
