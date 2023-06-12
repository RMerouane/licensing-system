import { IsString, IsUUID } from 'class-validator';

export class AddDeviceDTO {
  @IsString()
  name: string;

  @IsUUID()
  userId: string;
}

export interface DeviceInput {
  name: string;
  os: string;
  ipAdress: string;
  country: string;
}
