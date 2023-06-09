import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

const mockedUser = {
  id: '1',
  fullName: 'merouane',
  email: 'rouibah.merouane@gmail.com',
};

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            createUser: jest.fn(),
            getAll: jest.fn(),
            getUser: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create User', async () => {
    const userPayload = {
      fullName: 'merouane',
      email: 'rouibah.merouane@gmail.com',
      password: '123456789AZEIZEE',
    };
    (repository.createUser as jest.Mock).mockResolvedValue(mockedUser);

    const user = await service.createUser(userPayload);

    expect(user).toEqual(mockedUser);
  });

  it('should return all users', async () => {
    (repository.getAll as jest.Mock).mockResolvedValue([mockedUser]);
    const users = await service.getAll();

    expect(users).toEqual([mockedUser]);
  });

  it('given an id, it should return the user if exist', async () => {
    const userId = '1';

    (repository.getUser as jest.Mock).mockResolvedValue(mockedUser);
    const user = await service.getUser(userId);

    expect(user).toEqual(mockedUser);
  });
});
