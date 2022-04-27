import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { KanjiModel, UserModel } from '../../models/req-res.model';
import { KanjiStatsModel } from '../../models/socket-io.model';

import { Kanji } from './Kanji';
import { User } from './User';

@Entity({ name: 'kanjistats' })
export class KanjiStats implements KanjiStatsModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => Kanji)
  question_: KanjiModel;

  @ManyToOne(type => Kanji)
  answer_: KanjiModel;

  @ManyToOne(type => User)
  user_: UserModel;

}
