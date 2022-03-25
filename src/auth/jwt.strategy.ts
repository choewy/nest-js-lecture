import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as config from 'config';

const JWTConfig = config.get('jwt');
const secretOrKey = process.env.JWT_SECRET || JWTConfig.secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      secretOrKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { userid: string }) {
    const { userid } = payload;
    const user: User = await this.userRepository.findOne({ where: { userid } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
