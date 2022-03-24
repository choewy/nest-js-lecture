import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  readonly isNotEmpty = '빈 값은 입력할 수 없습니다.';

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userid: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '비밀번호는 영문과 숫자로 조합되어야 합니다.',
  })
  passwd: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;
}
