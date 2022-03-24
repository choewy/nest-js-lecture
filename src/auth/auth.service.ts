import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userid, passwd, name } = authCredentialsDto;
    const user = this.userRepository.create({ userid, passwd, name });
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
