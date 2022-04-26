import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './logger/logger.module';
import envConfig from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(),
    LoggerModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
