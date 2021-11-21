import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'edict' })
export class Edict {

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
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;
}
