import Gmail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Inject, Injectable } from '@nestjs/common';
import emailConfig from 'src/config/email.config';
import { ConfigType } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Gmail;
  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: config.auth,
    });
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    const baseUrl = this.config.baseUrl;
    const verifyUrl = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    const emailOptions: EmailOptions = {
      to: email,
      subject: '회원가입 인증 메일입니다.',
      html: `
        버튼을 클릭하시면 이메일 인증이 완료됩니다.
        <form action="${verifyUrl}" method="POST">
          <button type="submit">이메일 인증 완료</button>
        </form>
      `,
    };
    return await this.transporter.sendMail(emailOptions);
  }
}
