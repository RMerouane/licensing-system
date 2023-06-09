import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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
    const isExisting = await this.userRepository.getUserByEmail(
      createUserDto.email,
    );

    if (isExisting) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exist`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = (await bcrypt.hash(
      createUserDto.password,
      salt,
    )) as string;

    const user = await this.userRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

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
