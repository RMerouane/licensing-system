import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getAllUser() {
    return this.userService.getAll();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }
}
