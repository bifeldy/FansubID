import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { TatoebaModel } from '../../models/req-res.model';

@Entity({ name: 'tatoeba' })
export class Tatoeba implements TatoebaModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  phrase: string;

  @Column({ type: 'text', nullable: true })
  kanji: string;

  @Column({ type: 'text', nullable: true })
  flags: string;

  @Column({ type: 'text', nullable: true })
  translate: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

}
