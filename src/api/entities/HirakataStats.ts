import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Hirakata } from './Hirakata';
import { User } from './User';

@Entity({ name: 'hirakatastats' })
export class HirakataStats {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @ManyToOne(type => Hirakata)
  // tslint:disable-next-line: variable-name
  question_: Hirakata;

  @ManyToOne(type => Hirakata)
  // tslint:disable-next-line: variable-name
  answer_: Hirakata;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;
}
