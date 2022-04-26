import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsNotIncludes } from '../pipe/is-not-includes.pipe';

export class UsersDtoDecorators {
  IsEmailString = () => IsString({ message: '이메일 형식에 맞지 않습니다.' });
  IsEmailValid = () => IsEmail({}, { message: '이메일 형식에 맞지 않습니다.' });
  EmailMaxLength = () =>
    MaxLength(60, { message: '이메일은 60자 이내로 입력하세요.' });

  NameTransForm = () => Transform((parmas) => parmas.value.trim());
  IsNameNotIncludes = () =>
    IsNotIncludes('password', {
      message: '이름과 같은 문자열을 포함시킬 수 없습니다.',
    });
  IsNameString = () =>
    IsString({
      message: '이름 형식에 맞지 않습니다.',
    });
  NameMinLength = () =>
    MinLength(2, {
      message: '이름은 2-30자 이내로 입력하세요.',
    });
  NameMaxLength = () =>
    MaxLength(30, {
      message: '이름은 2-30자 이내로 입력하세요.',
    });

  PasswordIsString = () =>
    IsString({ message: '비밀번호 형식에 맞지 않습니다.' });
  PasswordMatches = () =>
    Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/, {
      message: '비밀번호 형식에 맞지 않습니다.',
    });
}
