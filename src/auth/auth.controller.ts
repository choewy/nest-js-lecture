import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthSignUpCredentialsDto,
  AuthSignInCredentialsDto,
} from './dto/auth-credentials.dto';

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
}
