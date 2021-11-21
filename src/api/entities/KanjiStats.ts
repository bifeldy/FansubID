import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Kanji } from './Kanji';
import { User } from './User';

@Entity({ name: 'kanjistats' })
export class KanjiStats {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => Kanji)
  question_: Kanji;

  @ManyToOne(type => Kanji)
  answer_: Kanji;

  @ManyToOne(type => User)
  user_: User;
}
