import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { KanjiVgModel } from '../../models/req-res.model';

@Entity({ name: 'kanjivg' })
export class KanjiVg implements KanjiVgModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  kanji: string;

  @Column({ type: 'text', nullable: true })
  level: string;

  @Column({ type: 'text', nullable: true })
  path: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
