import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import * as fs from 'fs';

/* root 경로에 ormconfig.json 생성 */
async function makeOrmConfig() {
  const appConfig = new AppConfig();
  const typeOrmConfig = appConfig.getTypeOrmConfig();
  const ormConfig = JSON.stringify(typeOrmConfig, null, 2);
  fs.writeFileSync('ormconfig.json', ormConfig);
}

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

bootstrap();
