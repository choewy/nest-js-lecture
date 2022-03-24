import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  readonly isNotEmpty = '빈 값은 입력할 수 없습니다.';

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
