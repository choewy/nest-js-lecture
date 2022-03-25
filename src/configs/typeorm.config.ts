import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
import * as config from 'config';

const DBConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: DBConfig.type,
  host: process.env.DB_HOSTNAME || DBConfig.host,
  port: process.env.DB_PORT || DBConfig.port,
  username: process.env.DB_USERNAME || DBConfig.username,
  password: process.env.DB_PASSWORD || DBConfig.password,
  database: process.env.DB_NAME || DBConfig.database,
  synchronize: DBConfig.synchronize,
  entities: [Board, User],
};
