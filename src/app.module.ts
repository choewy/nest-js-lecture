import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/email.config';

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
    UsersModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
