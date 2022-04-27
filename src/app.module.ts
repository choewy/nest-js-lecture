import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import envConfig from './config/env.config';
import { HttpExceptionModule } from './filter/http.exception.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRoot(),
    UsersModule,
    HttpExceptionModule,
  ],
  controllers: [],
})
export class AppModule {}
