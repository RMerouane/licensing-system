import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';

const mockedUser = {
  id: 1,
  fullName: 'merouane',
  email: 'rouibah.merouane@gmail.com',
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({
            createUser: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create  user', async () => {
    const createUserPayload: CreateUserDTO = {
      fullName: 'merouane',
      email: 'rouibah.merouane@gmail.com',
      password: 'AZERTUIOPQNBH',
    };

    (service.createUser as jest.Mock).mockResolvedValue(mockedUser);

    const user = await controller.createUser(createUserPayload);

    expect(user).toBe(mockedUser);
    expect(service.createUser).toHaveBeenCalled();
  });

  /*  it('should return validation error if the password is not 12 characters ', async () => {
    const userPayload = {
      fullName: 'merouane',
      email: 'rouibah.merouane@gmail.com',
      password: '1234',
    };

    expect(controller.createUser(userPayload)).rejects.toThrowError(
      'Password must have at least 12 diffrent characters',
    );
  }); */
});
