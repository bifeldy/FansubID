import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './User';
import { Fansub } from './Fansub';
import { ProjectType } from './ProjectType';

@Entity({ name: 'berkas' })
export class Berkas {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  private: boolean;

  @Column({ type: 'text' })
  // tslint:disable-next-line: variable-name
  download_url: string;

  @Column({ type: 'text', nullable: true })
  // tslint:disable-next-line: variable-name
  image_url: string;

  @Column({ type: 'bigint', nullable: true })
  // tslint:disable-next-line: variable-name
  mal_id: number;

  @Column({ type: 'int', nullable: true })
  // tslint:disable-next-line: variable-name
  episode: number;

  @Column({ type: 'bigint', default: 0, nullable: true })
  // tslint:disable-next-line: variable-name
  view_count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @ManyToOne(type => ProjectType)
  // tslint:disable-next-line: variable-name
  project_type_: ProjectType;

  @ManyToOne(type => Fansub)
  // tslint:disable-next-line: variable-name
  fansub_: Fansub;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;
}
