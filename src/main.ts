import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrmConfig } from './config/orm.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

/* root 경로에 ormconfig.json 생성 */
async function createOrmConfig() {
  const ormConfig = new OrmConfig().genTypeOrmConfig();
  const ormConfigJson = JSON.stringify(ormConfig, null, 2);
  fs.writeFileSync('ormconfig.json', ormConfigJson);
}

async function bootstrap() {
  await createOrmConfig();

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
