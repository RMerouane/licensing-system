import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { BadRequestException } from '@nestjs/common';

const mockedUser = {
  userId: 1,
  fullName: 'merouane',
  email: 'rouibah.merouane@gmail.com',
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create User', async () => {
    const userPayload = {
      fullName: 'merouane',
      email: 'rouibah.merouane@gmail.com',
      pwd: '123456789AZEIZEE',
    };
    const user = await service.createUser(userPayload);

    expect(user).toEqual(mockedUser);
  });

  it('should return validation error if the password is not 12 characters ', async () => {
    const userPayload = {
      fullName: 'merouane',
      email: 'rouibah.merouane@gmail.com',
      pwd: '1234',
    };

    expect(() => service.createUser(userPayload)).toThrowError(
      'password must have minimum 12 diffrents characters',
    );
  });

  it("should throw validation error if the password doesn't have 12 diffrents characters", () => {
    const userPayload = {
      fullName: 'merouane',
      email: 'rouibah.merouane@gmail.com',
      pwd: 'azertyuiopqqqq',
    };

    expect(() => service.createUser(userPayload)).toThrowError(
      'password must have minimum 12 diffrents characters',
    );
  });
});
