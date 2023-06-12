import { IsUUID } from 'class-validator';

export class GetDeviceDTO {
  @IsUUID()
  deviceId: string;
}
