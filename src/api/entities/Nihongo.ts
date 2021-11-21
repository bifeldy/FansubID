import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './User';

@Entity({ name: 'nihongo' })
export class Nihongo {

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

  @Column({ type: 'text' })
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => User)
  user_: User;
}
