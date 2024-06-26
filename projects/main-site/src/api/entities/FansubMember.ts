import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

import { FansubModel, FansubMemberModel, UserModel } from '../../models/req-res.model';

import { Fansub } from './Fansub';
import { User } from './User';

@Entity({ name: 'fansub_member' })
export class FansubMember implements FansubMemberModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  keterangan: string;

  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => Fansub, { primary: true })
  fansub_: FansubModel;

  @ManyToOne(type => User, { primary: true })
  user_: UserModel;

  @ManyToOne(type => User)
  approved_by_: UserModel;

}
