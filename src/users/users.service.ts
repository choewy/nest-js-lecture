import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Connection, Repository } from 'typeorm';
import { UsersException } from './users.exception';
import { ulid } from 'ulid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UserSignupDto } from './dto/user-signup.dto';

const SECRET = 'TEST';

interface Payload extends JwtPayload {
  id?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private usersExceptions: UsersException,
    private connection: Connection,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltKey = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltKey);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private generateToken(userId: string) {
    return jwt.sign({ id: userId }, SECRET);
  }

  private async findUserByEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return Boolean(user);
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

  private async findUserByEmailSecure(email: string, password: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ email })
      .select([
        'user.id',
        'user.email',
        'user.password',
        'user.name',
        'user.role',
        'user.deletedAt',
      ])
      .getOne();

    if (!user) throw this.usersExceptions.WrongEmailOrPassword();
    if (!(await this.comparePassword(password, user.password)))
      throw this.usersExceptions.WrongEmailOrPassword();
    if (user.deletedAt) throw this.usersExceptions.Suspended();
    return user;
  }

  async userSignup(userSignupDto: UserSignupDto): Promise<string> {
    const { email } = userSignupDto;
    const isExist = await this.findUserByEmail(email);

    if (isExist) this.usersExceptions.AlreadyExist();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let token: string;

    try {
      const { email, name, password } = userSignupDto;
      const user = new UserEntity();
      user.id = ulid();
      user.email = email;
      user.name = name;
      user.password = await this.hashPassword(password);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      token = this.generateToken(user.id);
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (!token) {
      throw this.usersExceptions.DatabaseError();
    }

    return token;
  }

  async userLogin(userLoginDto: UserLoginDto): Promise<string> {
    const { email, password } = userLoginDto;
    const user = await this.findUserByEmailSecure(email, password);
    return this.generateToken(user.id);
  }

  async userInfo(authorization: string) {
    const [type, token]: Array<string> = (authorization || ' ').split(' ');
    if (type !== 'Bearer') throw this.usersExceptions.Authorization();

    const payload: Payload = Object(jwt.verify(token, SECRET));
    if (!payload.id) throw this.usersExceptions.Authorization();

    return await this.findUserById(payload.id);
  }
}
