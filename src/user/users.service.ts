import * as uuid from 'uuid';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Connection, Repository } from 'typeorm';
import { ulid } from 'ulid';
import { UsersException } from './users.configs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
    private exceptions: UsersException,
  ) {}

  async checkUserExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user !== null;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExist = await this.checkUserExists(email);
    if (isExist) this.exceptions.AlreadyExistUser();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.id = ulid();
      user.password = 'HASHED PASSWORD';
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
