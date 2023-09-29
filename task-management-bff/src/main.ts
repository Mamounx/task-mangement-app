import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { PORT, corsConfig, swaggerConfig } from './configs';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Task Management App')

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, document);

  await app
  .listen(PORT)
  .then(() => {
    logger.verbose(`Appplication started on port: ${PORT}`);
  })
  .catch(err => logger.error(err));
}
bootstrap();
