import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ApiKeyModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'api_key' })
export class ApiKey implements ApiKeyModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  ip_domain: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  api_key: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => User)
  user_: UserModel;

}
