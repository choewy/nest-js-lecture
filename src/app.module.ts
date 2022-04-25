import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const appConfig = () => {
  const envDirPath = `${__dirname}/config/env`;
  const envFiles = () =>
    process.env.NODE_ENV === 'production'
      ? `${envDirPath}/.production.env`
      : [
          `${envDirPath}/.development.env`,
          `${envDirPath}/.development.email.env`,
        ];

  return {
    envFilePath: envFiles(),
    isGlobal: true,
    load: [],
  };
};

const configs = appConfig();

@Module({
  imports: [
    ConfigModule.forRoot(configs),
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
