import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrpyt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userid, passwd, name } = authCredentialsDto;
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
}
