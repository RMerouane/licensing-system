import { Injectable, BadRequestException } from '@nestjs/common';

export interface UserInput {
  fullName: string;
  email: string;
  pwd: string;
}

@Injectable()
export class UserService {
  createUser(user: UserInput) {
    const uniqueChracteres = new Set(user.pwd);

    if (uniqueChracteres.size < 12) {
      throw new Error('password must have minimum 12 diffrents characters');
    }

    if (user)
      return {
        userId: 1,
        fullName: user.fullName,
        email: user.email,
      };
  }
}
