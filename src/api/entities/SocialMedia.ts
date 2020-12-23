import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

import { User } from './User';

import { SosMed } from '../../app/_shared/models/SosMed';

@Entity({ name: 'social_media' })
export class SocialMedia {

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 255 })
  // tslint:disable-next-line: variable-name
  refresh_token: string;

  @PrimaryColumn({ type: 'enum', enum: [
    SosMed.DISCORD, SosMed.DISQUS,
    SosMed.GOOGLE, SosMed.FACEBOOK
  ] })
  type: SosMed;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;

  @ManyToOne(type => User)
  // tslint:disable-next-line: variable-name
  user_: User;
}
