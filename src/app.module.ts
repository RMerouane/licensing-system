import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
