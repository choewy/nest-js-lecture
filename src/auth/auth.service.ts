import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AuthSignUpCredentialsDto,
  AuthSignInCredentialsDto,
} from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrpyt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(
    authSignUpCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    const { userid, passwd, name } = authSignUpCredentialsDto;
    const salt = await bcrpyt.genSalt();
    const hashedPasswd = await bcrpyt.hash(passwd, salt);
    const user = this.userRepository.create({
      userid,
      name,
      passwd: hashedPasswd,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      const { code } = error;
      if (code === '23505') {
        throw new ConflictException('Already existed userid');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<string> {
    const { userid, passwd } = authSignInCredentialsDto;
    const user = await this.userRepository.findOne({ where: { userid } });
    if (user) {
      if (await bcrpyt.compare(passwd, user.passwd)) {
        return 'Login Success';
      }
      throw new UnauthorizedException('Incorrected Password');
    }
    throw new UnauthorizedException('User not Found');
  }
}
