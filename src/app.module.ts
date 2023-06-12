import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root1234',
      database: 'licensing-system',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    DeviceModule,
  ],
  providers: [],
})
export class AppModule {}
