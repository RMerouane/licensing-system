import { Injectable, NotFoundException } from '@nestjs/common';

import { DeviceRepository } from './device.repository';
import { AddDeviceDTO } from './dto/addDevice.dto';
import { GetDeviceDTO } from './dto/getDevice.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addDevice(addDeviceDto: AddDeviceDTO) {
    const user = await this.userRepository.getUser(addDeviceDto.userId);

    if (!user) {
      throw new NotFoundException(
        `user with id ${addDeviceDto.userId} doesn't not exist`,
      );
    }

    const device = await this.deviceRepository.addDevice(
      {
        name: addDeviceDto.name,
        os: 'windows',
        ipAdress: '127.0.0.1',
        country: 'USA',
      },
      user,
    );
    return device;
  }

  async getDevice(getDeviceDto: GetDeviceDTO) {
    const device = await this.deviceRepository.getDevice(getDeviceDto);

    if (!device) {
      throw new NotFoundException(
        `device with id ${getDeviceDto.deviceId} not found`,
      );
    }

    return device;
  }
}
