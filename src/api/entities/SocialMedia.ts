import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

import { User } from './User';

import { SosMed } from '../../app/_shared/models/SosMed';

@Entity({ name: 'social_media' })
export class SocialMedia {

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 255 })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  refresh_token: string;

  @PrimaryColumn({ type: 'enum', enum: [
    SosMed.DISCORD, SosMed.DISQUS,
    SosMed.GOOGLE, SosMed.FACEBOOK
  ] })
  type: SosMed;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  updated_at: number;

  @ManyToOne(type => User)
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  user_: User;
}
