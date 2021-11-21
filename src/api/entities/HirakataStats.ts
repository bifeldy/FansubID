import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Hirakata } from './Hirakata';
import { User } from './User';

@Entity({ name: 'hirakatastats' })
export class HirakataStats {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => Hirakata)
  question_: Hirakata;

  @ManyToOne(type => Hirakata)
  answer_: Hirakata;

  @ManyToOne(type => User)
  user_: User;
}
