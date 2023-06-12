import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { AddDeviceDTO } from './dto/addDevice.dto';
import { GetDeviceDTO } from './dto/getDevice.dto';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  addDevice(@Body() addDeviceDto: AddDeviceDTO) {
    return this.deviceService.addDevice(addDeviceDto);
  }

  @Get('/:deviceId')
  getDevice(@Param() getDeviceDto: GetDeviceDTO) {
    return this.deviceService.getDevice(getDeviceDto);
  }
}
