import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from './user.entity';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(Logger) private readonly logge: LoggerService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async userSignup(@Body() userSignupDto: UserSignupDto): Promise<void> {
    await this.userService.userSignup(userSignupDto);
  }

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<string> {
    return this.userService.userLogin(userLoginDto);
  }

  @Get(':id')
  async userInfo(@Param('id') userId: string): Promise<UserEntity> {
    return this.userService.userInfo(userId);
  }
}
