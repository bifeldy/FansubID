import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

import { SocialMediaModel, SosMedModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'social_media' })
export class SocialMedia implements SocialMediaModel {

  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  refresh_token: string;

  @PrimaryColumn({ type: 'enum', enum: SosMedModel })
  type: SosMedModel;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
