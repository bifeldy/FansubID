import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

import { NewsModel, BerkasModel, FansubModel, UserModel } from '../../models/req-res.model';
import { TrackModel } from '../../models/socket-io.model';

import { Berkas } from './Berkas';
import { Fansub } from './Fansub';
import { News } from './News';
import { User } from './User';

@Entity({ name: 'track' })
export class Track implements TrackModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  ip: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
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
  track_by_: UserModel;

}
