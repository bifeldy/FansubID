import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Berkas } from './Berkas';
import { Fansub } from './Fansub';
import { User } from './User';

import { LikeAndDislike } from '../../app/_shared/models/LikeAndDislike';

@Entity({ name: 'like_dislike' })
export class Report {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: [LikeAndDislike.LIKE, LikeAndDislike.DISLIKE] })
  type: LikeAndDislike;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @ManyToOne(type => Berkas)
  // tslint:disable-next-line: variable-name
  berkas_: Berkas;

  @ManyToOne(type => Fansub)
  // tslint:disable-next-line: variable-name
  fansub_: Fansub;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  report_by_: User;
}
