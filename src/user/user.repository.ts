import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDTO) {
    const user = this.create(createUserDto);

    return await this.save(user);
  }

  async getAll() {
    const users = await this.find();

    return users;
  }

  async getUser(userId: string) {
    const user = await this.findOne({ where: { id: userId } });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.findOne({ where: { email } });

    return user ? true : false;
  }
}
