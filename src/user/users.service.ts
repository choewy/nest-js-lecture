import * as uuid from 'uuid';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Connection, Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
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
    // await this.verifyEmail(email, signupVerifyToken);
  }

  async checkUserExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user !== null;
  }

  async saveUser(createUserDto: CreateUserDto, signupVerifyToken: string) {
    /* 트랜잭션 처리를 위한 queryRunner 객체 생성 */
    const queryRunner = this.connection.createQueryRunner();

    /* DB 연결 후 트랜젝션 시작 */
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { name, email, password } = createUserDto;
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (e) {
      /* 오류 발생 시 롤백 처리 */
      await queryRunner.rollbackTransaction();
    } finally {
      /* 반드시 queryRunner 객체 해제 */
      await queryRunner.release();
    }
  }

  // private async verifyEmail(
  //   email: string,
  //   signupVerifyToken: string,
  // ): Promise<string> {
  //   return this.emailService.sendMemberJoinEmail(email, signupVerifyToken);
  // }

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
