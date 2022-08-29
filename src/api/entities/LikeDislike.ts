import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { BerkasModel, FansubModel, LikeAndDislikeModel, LikeDislikeModel, NewsModel, UserModel } from '../../models/req-res.model';

import { Berkas } from './Berkas';
import { Fansub } from './Fansub';
import { News } from './News';
import { User } from './User';

@Entity({ name: 'like_dislike' })
export class LikeDislike implements LikeDislikeModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: LikeAndDislikeModel })
  type: LikeAndDislikeModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => News)
  news_: NewsModel;

  @ManyToOne(type => Berkas)
  berkas_: BerkasModel;

  @ManyToOne(type => Fansub)
  fansub_: FansubModel;

  @ManyToOne(type => User)
  user_: UserModel;

  @ManyToOne(type => User)
  report_by_: UserModel;

}
