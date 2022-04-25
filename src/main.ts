import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/* root 경로에 ormconfig.json 생성 */
async function makeOrmConfig() {
  const appConfig = new AppConfig();
  const typeOrmConfig = appConfig.getTypeOrmConfig();
  const ormConfig = JSON.stringify(typeOrmConfig, null, 2);
  fs.writeFileSync('ormconfig.json', ormConfig);
}

async function bootstrap() {
  await makeOrmConfig();

  const config = new DocumentBuilder()
    .setTitle('Next API')
    .setDescription('The Description of the API')
    .setVersion('1.0')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  SwaggerModule.setup('/ApiDocs', app, document);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
