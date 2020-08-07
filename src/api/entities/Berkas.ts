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

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  urls: string;

  @Column({ type: 'varchar', length: 255, default: '/favicon.ico' })
  // tslint:disable-next-line: variable-name
  image_url: string;

  @Column({ type: 'bigint', nullable: true })
  // tslint:disable-next-line: variable-name
  api_id: number;

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
