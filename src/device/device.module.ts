import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController } from './device.controller';
import { DeviceRepository } from './device.repository';
import { DeviceService } from './device.service';
import { Device } from './device.entity';
import { UserRepository } from '../user/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device]), UserModule],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
