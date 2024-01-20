import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Index, Column, OneToOne, JoinColumn } from 'typeorm';

import { UserPremiumModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'user_premium' })
export class UserPremium implements UserPremiumModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  started_at: number | Date;

  @Column({ type: 'timestamp with time zone', default: () => `CURRENT_TIMESTAMP + '1 month'::interval` })
  expired_at: number | Date;

  @OneToOne(type => User, { primary: true })
  @JoinColumn()
  user_: UserModel;

}
