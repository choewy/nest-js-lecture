import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3001,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [`${__dirname}../**/*.entity.{js, ts}`],
  synchronize: false,
};
