import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { FansubModel, UserFansubGroupMemberModel, UserModel } from '../../models/req-res.model';

import { Fansub } from './Fansub';
import { User } from './User';

@Entity({ name: 'fansub_member' })
export class FansubMember implements UserFansubGroupMemberModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  keterangan: string;

  @Column({ type: 'boolean', default: false })
  approved: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => Fansub, { primary: true })
  fansub_?: FansubModel;

  @ManyToOne(type => User, { primary: true })
  user_: UserModel;

  @ManyToOne(type => User)
  approved_by_: UserModel;

}
