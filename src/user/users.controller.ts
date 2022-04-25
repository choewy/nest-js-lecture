import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    // 201
    await this.userService.createUser(createUserDto);
  }

  @Post('email-verify')
  async emailVerify(@Query() verifyEmailDto: VerifyEmailDto): Promise<string> {
    // 201, Access Token
    console.log(verifyEmailDto);
    return;
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
    console.log(userLoginDto);
    return this.userService.login(userLoginDto);
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfoDto> {
    console.log(userId);
    return this.userService.getUserInfo(userId);
  }
}
