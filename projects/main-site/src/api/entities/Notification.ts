import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from 'typeorm';

import { NotificationModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'notification' })
export class Notification implements NotificationModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'boolean' })
  dismissible: boolean;

  @Column({ type: 'int', default: 10000 })
  timeout: number;

  @Column({ type: 'timestamp' })
  deadline: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;

  @ManyToOne(type => User)
  @JoinColumn()
  user_: UserModel;

}
