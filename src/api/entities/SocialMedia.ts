import { Entity, Column, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { SocialMediaModel, SosMedModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'social_media' })
export class SocialMedia implements SocialMediaModel {

  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  refresh_token: string;

  @PrimaryColumn({ type: 'enum', enum: SosMedModel })
  type: SosMedModel;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
