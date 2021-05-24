import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Kanji } from './Kanji';
import { User } from './User';

@Entity({ name: 'kanjistats' })
export class KanjiStats {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @ManyToOne(type => Kanji)
  // tslint:disable-next-line: variable-name
  question_: Kanji;

  @ManyToOne(type => Kanji)
  // tslint:disable-next-line: variable-name
  answer_: Kanji;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;
}
