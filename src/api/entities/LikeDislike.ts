import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Berkas } from './Berkas';
import { Fansub } from './Fansub';
import { User } from './User';

import { LikeAndDislike } from '../../app/_shared/models/LikeAndDislike';

@Entity({ name: 'like_dislike' })
export class LikeDislike {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: [LikeAndDislike.LIKE, LikeAndDislike.DISLIKE] })
  type: LikeAndDislike;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => Berkas)
  berkas_: Berkas;

  @ManyToOne(type => Fansub)
  fansub_: Fansub;

  @ManyToOne(type => User)
  user_: User;

  @ManyToOne(type => User)
  report_by_: User;
}
