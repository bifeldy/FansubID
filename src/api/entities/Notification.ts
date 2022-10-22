import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: 'timestamp' })
  deadline: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  @JoinColumn()
  user_: UserModel;

}
