import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

import { BannedModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'banned' })
export class Banned implements BannedModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  reason: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @OneToOne(type => User)
  @JoinColumn()
  user_: UserModel;

  @ManyToOne(type => User)
  banned_by_: UserModel;

}
