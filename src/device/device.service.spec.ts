import { Test, TestingModule } from '@nestjs/testing';

import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';
import { UserRepository } from '../user/user.repository';

const MockedDevice = {
  id: '1',
  deviceName: 'MSI',
  deviceOS: 'windows',
  ipAdress: '12.0.0.1',
  country: 'USA',
  isActive: false,
  user: '1',
};

const mockedUser = {
  id: '1',
  fullName: 'merouane',
  email: 'rouibah.merouane@gmail.com',
};

describe('DeviceService', () => {
  let service: DeviceService;
  let userRepository: UserRepository;
  let deviceRepository: DeviceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: DeviceRepository,
          useFactory: () => ({
            addDevice: jest.fn(),
          }),
        },
        {
          provide: UserRepository,
          useFactory() {
            getUser: jest.fn();
          },
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    userRepository = module.get<UserRepository>(UserRepository);
    deviceRepository = module.get<DeviceRepository>(DeviceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add device to user', () => {
    const devicePayload = {
      name: 'MSI',
      os: 'windows',
      ipAdresse: '127.0.0.1',
      country: 'nothing',
    };

    const userId = '1';

    (userRepository.getUser as jest.Mock).mockResolvedValue(mockedUser);
    (deviceRepository.addDevice as jest.Mock).mockResolvedValue(MockedDevice);

    const device = service.addDevice({ name: devicePayload.name, userId });

    expect(device).toEqual(MockedDevice);
  });
});
