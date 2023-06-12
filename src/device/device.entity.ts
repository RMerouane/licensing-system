import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  os: string;

  @Column()
  ipAdress: string;

  @Column()
  country: string;

  @Column()
  isActive: boolean;

  @Column()
  lastConnection: Date;

  @ManyToOne(() => User, (user) => user.devices)
  user: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
