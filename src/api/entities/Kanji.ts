import { Entity, Column } from 'typeorm';

@Entity({ name: 'kanji' })
export class Kanji {

  @Column({ primary: true, type: 'varchar', length: 255 })
  character: string;

  @Column({ type: 'int', default: 0 })
  jlpt: number;

  @Column({ type: 'int', default: 0 })
  school: number;

  @Column({ type: 'int', default: 0 })
  stroke: number;

  @Column({ type: 'int', default: 0 })
  freq: number;

  @Column({ type: 'text', nullable: true })
  skip: string;

  @Column({ type: 'text', nullable: true })
  nelson_n: string;

  @Column({ type: 'int', default: 0 })
  nelson_c: number;

  @Column({ type: 'int', default: 0 })
  context: number;

  @Column({ type: 'int', default: 0 })
  harlpern_njecd: number;

  @Column({ type: 'int', default: 0 })
  harlpern_kkld: number;

  @Column({ type: 'int', default: 0 })
  gakken: number;

  @Column({ type: 'int', default: 0 })
  remember: number;

  @Column({ type: 'int', default: 0 })
  maniette: number;

  @Column({ type: 'text', nullable: true })
  v_onyomi: string;

  @Column({ type: 'text', nullable: true })
  v_kunyomi: string;

  @Column({ type: 'text', nullable: true })
  translate: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;
}
