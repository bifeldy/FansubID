import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

import { KanjivgModel } from '../../models/req-res.model';

@Entity({ name: 'kanjivg' })
export class Kanjivg implements KanjivgModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  kanji: string;

  @Column({ type: 'text', nullable: true })
  level: string;

  @Column({ type: 'text', nullable: true })
  path: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
