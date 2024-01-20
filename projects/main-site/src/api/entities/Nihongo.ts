import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

import { NihongoModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'nihongo' })
export class Nihongo implements NihongoModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  romaji: string;

  @Column({ type: 'text' })
  kana: string;

  @Column({ type: 'text' })
  meaning: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text', nullable: true })
  audio: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
