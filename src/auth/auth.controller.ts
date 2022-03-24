import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  AuthSignUpCredentialsDto,
  AuthSignInCredentialsDto,
} from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authSignUpCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authSignUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authSignInCredentialsDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  validate(@GetUser() user: User) {
    console.log(user);
  }
}
