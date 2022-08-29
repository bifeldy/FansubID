import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { NewsModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'news' })
export class News implements NewsModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @Column({ type: 'text', default: '[]' })
  tags: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
