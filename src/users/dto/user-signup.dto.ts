import { UsersDtoDecorators } from './users.dto.decorators';

const Decorators = new UsersDtoDecorators();

export class UserSignupDto {
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
