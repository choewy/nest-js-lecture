import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const ServerConfig = config.get('server');
  const port = process.env.PORT || ServerConfig.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  const logger = new Logger();
  logger.log(`Nest Js Application running on port ${port}`);
}

bootstrap();
