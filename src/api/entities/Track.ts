import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

import { Berkas } from './Berkas';
import { Fansub } from './Fansub';
import { User } from './User';

@Entity({ name: 'track' })
export class Track {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  ip: string;

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
  track_by_: User;
}
