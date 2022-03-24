import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthSignUpCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userid: string;

  @IsString()
  passwd: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;
}

export class AuthSignInCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userid: string;

  @IsString()
  passwd: string;
}
