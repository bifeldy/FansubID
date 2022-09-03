import { Entity, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { InformationModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'information' })
export class Information implements InformationModel {

  @Column({ primary: true, type: 'text' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', default: 'Ya' })
  confirm: string;

  @Column({ type: 'text', nullable: true })
  cancel: string;

  @Column({ type: 'boolean', default: false })
  close: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  @JoinColumn()
  user_: UserModel;

}
