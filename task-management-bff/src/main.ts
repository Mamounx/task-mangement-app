import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiBasicAuth, SwaggerModule } from '@nestjs/swagger';
import { corsConfig, swaggerConfig } from './configs';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Task Management App')

  app.enableCors(corsConfig);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, document);

  await app
  .listen(3001)
  .then(() => {
    logger.verbose(`Appplication started on port: 3001`);
  })
  .catch(err => logger.error(err));
}
bootstrap();
