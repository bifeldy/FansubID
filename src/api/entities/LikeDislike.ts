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
  report_by_: User;
}
