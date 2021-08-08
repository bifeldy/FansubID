import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Hirakata } from './Hirakata';
import { User } from './User';

@Entity({ name: 'hirakatastats' })
export class HirakataStats {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  updated_at: number;

  @ManyToOne(type => Hirakata)
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  question_: Hirakata;

  @ManyToOne(type => Hirakata)
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  answer_: Hirakata;

  @ManyToOne(type => User)
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  user_: User;
}
