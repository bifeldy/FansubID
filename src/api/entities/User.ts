import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { KartuTandaPendudukModel, ProfileModel, RoleModel, UserModel } from '../../models/req-res.model';

import { KartuTandaPenduduk } from './KartuTandaPenduduk';
import { Profile } from './Profile';

@Entity({ name: 'users' })
export class User implements UserModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: RoleModel, default: RoleModel.USER })
  role: RoleModel;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true, default: null, unique: true })
  discord: string;

  @Column({ type: 'text', nullable: true })
  session_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @OneToOne(type => KartuTandaPenduduk)
  @JoinColumn()
  kartu_tanda_penduduk_: KartuTandaPendudukModel;

  @OneToOne(type => Profile)
  @JoinColumn()
  profile_: ProfileModel;
}
