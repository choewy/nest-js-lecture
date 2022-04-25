import * as uuid from 'uuid';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private emailService: EmailService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExist = await this.checkUserExists(email);

    if (isExist) {
      throw new UnprocessableEntityException(
        '이미 존재하는 이메일 계정입니다.',
      );
    }

    const signupVerifyToken = uuid.v1();
    await this.saveUser(createUserDto, signupVerifyToken);
    await this.verifyEmail(email, signupVerifyToken);
  }

  async checkUserExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ email });
    return !user;
  }

  async saveUser(createUserDto: CreateUserDto, signupVerifyToken: string) {
    const { name, email, password } = createUserDto;
    const user = new UserEntity();
    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
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
