import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';

const envDirPath = `${__dirname}/env`;
const path =
  process.env.NODE_ENV === 'production'
    ? `${envDirPath}/.production.env`
    : `${envDirPath}/.development.env`;

dotenv.config({ path });

export class OrmConfig {
  constructor(
    private env: { [key: string]: string | undefined } = process.env,
  ) {
    const ormConfig = this.genTypeOrmConfig();
    const ormConfigJson = JSON.stringify(ormConfig, null, 2);
    writeFileSync('ormconfig.json', ormConfigJson);
  }

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
