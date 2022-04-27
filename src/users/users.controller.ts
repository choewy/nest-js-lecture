import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async userSignup(@Body() userSignupDto: UserSignupDto): Promise<void> {
    const token = await this.userService.userSignup(userSignupDto);
    return;
  }

  @Post('login')
  async userLogin(@Body() userLoginDto: UserLoginDto): Promise<void> {
    const token = this.userService.userLogin(userLoginDto);
    return;
  }

  @Get()
  async userInfo(@Req() req: Request) {
    const authorization = String(req.headers['authorization']);
    return this.userService.userInfo(authorization);
  }
}
