import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Index } from 'typeorm';

import { HirakataModel } from '../../models/req-res.model';

@Entity({ name: 'hirakata' })
export class Hirakata implements HirakataModel {

  @PrimaryColumn({ type: 'text' })
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
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
