import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

const envDirPath = `${__dirname}/env`;
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? `${envDirPath}/.production.env`
      : `${envDirPath}/.development.env`,
});

export class OrmConfig {
  constructor(
    private env: { [key: string]: string | undefined } = process.env,
  ) {}

  private envItem(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`ConfigError: missing env.${key}`);
    }
    return value;
  }

  genTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      ssl: !(this.envItem('NODE_ENV', false) === 'development'),
      type: 'mysql',
      host: this.envItem('DATABASE_HOST'),
      port: parseInt(this.envItem('DATABASE_PORT')),
      username: this.envItem('DATABASE_USERNAME'),
      password: this.envItem('DATABASE_PASSWORD'),
      database: this.envItem('DATABASE_DBNAME'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['src/migration/*.ts'],
      synchronize: Boolean(this.envItem('DATABASE_SYNC')),
      cli: {
        migrationsDir: 'src/migration',
      },
    };
  }
}
