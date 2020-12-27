import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'kanjivg' })
export class Kanjivg {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: true })
  kanji: string;

  @Column({ type: 'text', nullable: true })
  level: string;

  @Column({ type: 'text', nullable: true })
  path: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;
}
