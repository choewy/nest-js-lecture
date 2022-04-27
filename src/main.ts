import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OrmConfig } from './config/orm.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';
import * as fs from 'fs';
import { HttpExceptionFilter } from './filter/http.exception.filter';

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

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/ApiDocs', app, document);

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
