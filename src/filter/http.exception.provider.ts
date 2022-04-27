import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http.exception.filter';

const HttpExceptionProvider = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

export default HttpExceptionProvider;
