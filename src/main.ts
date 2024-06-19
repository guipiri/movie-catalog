import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie Catalog')
    .setDescription('The movie catalog API description')
    .setVersion('1.0')
    .addTag('Start here!')
    .addTag('User')
    .addTag('Auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}!`);
  });
}
bootstrap();
