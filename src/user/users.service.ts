import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    const saveUserDto = {
      ...createUserDto,
      signupVerifyToken,
    };
    await this.saveUser(saveUserDto);
    await this.verifyEmail(email, signupVerifyToken);
  }

  async checkUserExists(email: string): Promise<boolean> {
    console.log(email);
    // TODO : DB 연결 후 구현
    return false;
  }

  async saveUser(saveUserDto: { name: string }) {
    console.log(saveUserDto);
    // TODO : DB 연결 후 구현
    return;
  }

  private async verifyEmail(
    email: string,
    signupVerifyToken: string,
  ): Promise<string> {
    // TODO
    /**
     * DB에서 signupVerify로 회원가입 처리 중인 유저가 있는지 조회
     * 없다면, 에러 처리
     * 있다면, 바로 로그인 상태가 되도록 JWT 발급
     */
    return this.emailService.sendMemberJoinEmail(email, signupVerifyToken);
    // throw new Error('Method not implemented');
  }

  async login(userLoginDto: UserLoginDto): Promise<string> {
    console.log(userLoginDto);
    // TODO
    /**
     * email, password를 가진 유저가 존재하는지 확인
     * 없다면, 에러 처리
     * 있다면 JWT 발급
     */
    throw new Error('Method not implemented');
  }

  async getUserInfo(userId: string): Promise<UserInfoDto> {
    console.log(userId);
    throw new Error('Method not implemented');
  }
}
