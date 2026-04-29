import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const result: string[] = [];
        const extract = (error: any) => {
          if (error.constraints) {
            result.push(
              ...Object.values(error.constraints) as string[]
            );
          }
          if (error.children && error.children.length) {
            error.children.forEach(extract);
          }
        };
        errors.forEach(extract);
        return new BadRequestException({
          message: result.length ? result : 'Validation failed',
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();