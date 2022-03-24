import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3001,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/**/*.entity{.ts,.js}', Board, User],
  synchronize: true,
};
