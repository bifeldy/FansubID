import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

import { SocialMediaModel, SosMedModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'social_media' })
export class SocialMedia implements SocialMediaModel {

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 255 })
  refresh_token: string;

  @PrimaryColumn({ type: 'enum', enum: SosMedModel })
  type: SosMedModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => User)
  user_: UserModel;

}
