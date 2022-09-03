import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { KanjiModel, UserModel } from '../../models/req-res.model';
import { KanjiStatsModel } from '../../models/socket-io.model';

import { Kanji } from './Kanji';
import { User } from './User';

@Entity({ name: 'kanjistats' })
export class KanjiStats implements KanjiStatsModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => Kanji)
  question_: KanjiModel;

  @ManyToOne(type => Kanji)
  answer_: KanjiModel;

  @ManyToOne(type => User)
  user_: UserModel;

}
