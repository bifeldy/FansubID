import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

import { User } from './User';

import { SosMed } from '../../app/_shared/models/SosMed';

@Entity({ name: 'social_media' })
export class SocialMedia {

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 255 })
  refresh_token: string;

  @PrimaryColumn({ type: 'enum', enum: [
    SosMed.DISCORD, SosMed.DISQUS,
    SosMed.GOOGLE, SosMed.FACEBOOK
  ] })
  type: SosMed;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => User)
  user_: User;
}
