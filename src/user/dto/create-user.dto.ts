import { UsersDtoDecorators } from '../users.configs';

const Decorators = new UsersDtoDecorators();

export class CreateUserDto {
  @Decorators.IsEmailString()
  @Decorators.IsEmailValid()
  @Decorators.EmailMaxLength()
  readonly email: string;

  @Decorators.NameTransForm()
  @Decorators.IsNameNotIncludes()
  @Decorators.NameMinLength()
  @Decorators.NameMaxLength()
  readonly name: string;

  @Decorators.PasswordIsString()
  @Decorators.PasswordMatches()
  readonly password: string;
}
