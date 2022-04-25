import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const envDirPath = `${__dirname}/config/env`;
const envFiles = () =>
  process.env.NODE_ENV === 'production'
    ? `${envDirPath}/.production.env`
    : `${envDirPath}/.development.env`;

const appConfig = () => {
  return {
    envFilePath: envFiles(),
    isGlobal: true,
    load: [],
  };
};

@Module({
  imports: [
    ConfigModule.forRoot(appConfig()),
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
