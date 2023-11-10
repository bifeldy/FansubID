import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

import { HirakataModel, UserModel } from '../../models/req-res.model';
import { HirakataStatsModel } from '../../models/socket-io.model';

import { Hirakata } from './Hirakata';
import { User } from './User';

@Entity({ name: 'hirakatastats' })
export class HirakataStats implements HirakataStatsModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => Hirakata)
  question_: HirakataModel;

  @ManyToOne(type => Hirakata)
  answer_: HirakataModel;

  @ManyToOne(type => User)
  user_: UserModel;

}
