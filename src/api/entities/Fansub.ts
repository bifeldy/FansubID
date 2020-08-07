import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fansub' })
export class Fansub {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  tags: string;

  @Column({ type: 'varchar', length: 255 })
  urls: string;

  @Column({ type: 'date' })
  // tslint:disable-next-line: variable-name
  born: Date;

  @Column({ type: 'varchar', length: 255, default: '/favicon.ico' })
  // tslint:disable-next-line: variable-name
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;
}
