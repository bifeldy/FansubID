import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { HirakataModel, UserModel } from '../../models/req-res.model';
import { HirakataStatsModel } from '../../models/socket-io.model';

import { Hirakata } from './Hirakata';
import { User } from './User';

@Entity({ name: 'hirakatastats' })
export class HirakataStats implements HirakataStatsModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => Hirakata)
  question_: HirakataModel;

  @ManyToOne(type => Hirakata)
  answer_: HirakataModel;

  @ManyToOne(type => User)
  user_: UserModel;

}
