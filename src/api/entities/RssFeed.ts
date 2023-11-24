import { Entity, Column, CreateDateColumn, Index, ManyToOne, PrimaryColumn } from 'typeorm'

import { FansubModel, RssFeedModel } from '../../models/req-res.model';

import { Fansub } from './Fansub';

@Entity({ name: 'rss_feed' })
export class RssFeed implements RssFeedModel {

  @Column({ type: 'text' })
  title: string;

  @PrimaryColumn({ type: 'text' })
  link: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @ManyToOne(type => Fansub, { primary: true })
  fansub_: FansubModel;

}
