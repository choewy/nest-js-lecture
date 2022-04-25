import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

/* NODE_ENV에 해당하는 .env 파일 파싱 */
const envDirPath = `${__dirname}/config/env`;
const envFiles = () =>
  process.env.NODE_ENV === 'production'
    ? [`${envDirPath}/.production.env`]
    : [`${envDirPath}/.development.env`];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFiles(),
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
