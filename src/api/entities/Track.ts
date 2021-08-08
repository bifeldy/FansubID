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
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  updated_at: number;

  @ManyToOne(type => Berkas)
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  berkas_: Berkas;

  @ManyToOne(type => Fansub)
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  fansub_: Fansub;

  @ManyToOne(type => User)
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  user_: User;

  @ManyToOne(type => User)
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  track_by_: User;
}
