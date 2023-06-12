import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { Device } from './device.entity';
import { DeviceInput } from './dto/addDevice.dto';
import { GetDeviceDTO } from './dto/getDevice.dto';
import { User } from '../user/user.entity';
import { GetDevicesDTO } from './dto/getDevices.dto';

@Injectable()
export class DeviceRepository extends Repository<Device> {
  constructor(private dataSource: DataSource) {
    super(Device, dataSource.createEntityManager());
  }

  async addDevice(addDeviceDto: DeviceInput, user: User) {
    const device = this.create({
      ...addDeviceDto,
      user,
      isActive: false,
      lastConnection: new Date(),
    });

    await this.save(device);

    return device;
  }
}
