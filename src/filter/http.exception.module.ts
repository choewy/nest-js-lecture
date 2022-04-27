import { Logger, Module } from '@nestjs/common';
import HttpExceptionProvider from './http.exception.provider';

@Module({
  imports: [],
  providers: [Logger, HttpExceptionProvider],
})
export class HttpExceptionModule {}
