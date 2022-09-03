import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { ApiKeyModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'api_key' })
export class ApiKey implements ApiKeyModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '*' })
  ip_domain: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  api_key: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
