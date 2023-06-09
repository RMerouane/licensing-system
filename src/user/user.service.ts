import { Injectable } from '@nestjs/common';

import { CreateUserDTO } from './dto/createUser.dto';
import { UserRepository } from './user.repository';

export interface UserInput {
  fullName: string;
  email: string;
  pwd: string;
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDTO) {
    const user = await this.userRepository.createUser(createUserDto);

    return user;
  }

  async getAll() {
    const users = this.userRepository.getAll();

    return users;
  }

  async getUser(userId: string) {
    const user = await this.userRepository.getUser(userId);

    return user;
  }
}
