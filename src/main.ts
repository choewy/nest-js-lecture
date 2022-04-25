import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  await makeOrmConfig();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}

async function makeOrmConfig() {
  const configService = new ConfigService(process.env);
  const typeOrmConfig = configService.getTypeOrmConfig();
  fs.writeFileSync('ormconfig.json', JSON.stringify(typeOrmConfig, null, 2));
}

bootstrap();
