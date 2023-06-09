import { IsString, IsEmail } from 'class-validator';

import { UniqueChars } from '../validations/password.validation';

export class CreateUserDTO {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @UniqueChars()
  password: string;
}
