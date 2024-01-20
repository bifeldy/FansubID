import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from 'typeorm';

import { FansubModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'fansub' })
export class Fansub implements FansubModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', default: '// No Description' })
  description: string;

  @Column({ type: 'text', unique: true, nullable: true })
  slug: string;

  @Column({ type: 'date' })
  born: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text' })
  urls: string;

  @Column({ type: 'text', nullable: true })
  rss_feed: string;

  @Column({ type: 'text', default: '[]' })
  tags: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  cover_url: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @Column({ type: 'text', nullable: true })
  dns_id: string;

  @Column({ type: 'text', nullable: true })
  dns_id_alt: string;

  @Column({ type: 'boolean', default: true })
  editable: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
