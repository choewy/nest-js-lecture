import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Connection, Repository } from 'typeorm';
import { UsersException } from './users.exception';
import { ulid } from 'ulid';
import bcrypt from 'bcrypt';
import { UserSignupDto } from './dto/user-signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private usersExceptions: UsersException,
    private connection: Connection,
  ) {}

  private hashPassword(password: string): string {
    const saltKey = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, saltKey);
  }

  private async findUserByEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user !== null;
  }

  private async findUserById(userId: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id: userId, deletedAt: null })
      .select([
        'user.id',
        'user.email',
        'user.name',
        'user.role',
        'user.deletedAt',
      ])
      .getOne();
    if (!user) throw this.usersExceptions.NotFound();
    if (user.deletedAt) throw this.usersExceptions.Suspended();
    return user;
  }

  private async findUserByEmailAndPassword(email: string, password: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ email, password })
      .select([
        'user.id',
        'user.email',
        'user.name',
        'user.role',
        'user.deletedAt',
      ])
      .getOne();

    if (!user) throw this.usersExceptions.WrongEmailOrPassword();
    if (user.deletedAt) throw this.usersExceptions.Suspended();
    return user;
  }

  async userSignup(userSignupDto: UserSignupDto) {
    const { email } = userSignupDto;
    const isExist = await this.findUserByEmail(email);
    if (isExist) this.usersExceptions.AlreadyExist();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new UserEntity();
      user.id = ulid();
      user.password = this.hashPassword(user.password);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async userLogin(userLoginDto: UserLoginDto): Promise<string> {
    const { email, password } = userLoginDto;
    const user = await this.findUserByEmailAndPassword(email, password);
    // TODO
    /**
     * 토큰 생성
     */
    throw new Error('Method not implemented');
  }

  async userInfo(userId: string) {
    return await this.findUserById(userId);
  }
}
