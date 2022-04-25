import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsNotIncludes } from '../pipe/is-not-includes.pipe';

export class CreateUserDto {
  /** TODO
   * 유니코드 문자는 trim()으로 처리 불가능
   * 따로 공백 제거를 위한 방법 적용
   */
  @Transform((params) => params.value.trim())
  @IsNotIncludes('password', {
    message: '비밀번호에는 이름과 같은 문자열을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @Transform(({ value, obj }) => {
    if (obj.password.includes(value.trim()))
      throw new BadRequestException(
        '비밀번호에는 이메일이나 이름과 깉은 문자열을 포함할 수 없습니다.',
      );
    return value.trim();
  })
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
  readonly password: string;
}
