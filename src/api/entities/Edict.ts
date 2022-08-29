import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { EdictModel } from '../../models/req-res.model';

@Entity({ name: 'edict' })
export class Edict implements EdictModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  kanji: string;

  @Column({ type: 'text', nullable: true })
  reading: string;

  @Column({ type: 'text', nullable: true })
  meaning: string;

  @Column({ type: 'text', nullable: true })
  flags: string;

  @Column({ type: 'int', default: 0 })
  jlpt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;
}
