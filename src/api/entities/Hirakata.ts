import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { HirakataModel } from '../../models/req-res.model';

@Entity({ name: 'hirakata' })
export class Hirakata implements HirakataModel {

  @Column({ primary: true, type: 'varchar', length: 255 })
  romaji: string;

  @Column({ type: 'text' })
  hiragana: string;

  @Column({ type: 'text' })
  katakana: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  segment: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
