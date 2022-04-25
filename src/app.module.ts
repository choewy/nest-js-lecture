import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email.config';
import { TypeOrmModule } from '@nestjs/typeorm';

const envDirPath = `${__dirname}/config/env`;
const envFiles = () =>
  process.env.NODE_ENV === 'production'
    ? `${envDirPath}/.production.env`
    : [
        `${envDirPath}/.development.env`,
        `${envDirPath}/.development.email.env`,
      ];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFiles(),
      load: [emailConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNC),
      migrations: ['dist/migration/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrationsRun: true,
    }),
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
