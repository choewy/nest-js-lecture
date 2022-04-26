import { UsersDtoDecorators } from './users.dto.decorators';

const Decorators = new UsersDtoDecorators();

export class UserLoginDto {
  @Decorators.IsEmailString()
  @Decorators.IsEmailValid()
  @Decorators.EmailMaxLength()
  readonly email: string;

  @Decorators.PasswordIsString()
  @Decorators.PasswordMatches()
  readonly password: string;
}
