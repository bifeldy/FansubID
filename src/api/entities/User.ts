import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { KartuTandaPendudukModel, ProfileModel, RoleModel, UserModel } from '../../models/req-res.model';

import { KartuTandaPenduduk } from './KartuTandaPenduduk';
import { Profile } from './Profile';

@Entity({ name: 'users' })
export class User implements UserModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @Column({ type: 'enum', enum: RoleModel, default: RoleModel.USER })
  role: RoleModel;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true, default: null, unique: true })
  discord: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  session_token: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @OneToOne(type => KartuTandaPenduduk)
  @JoinColumn()
  kartu_tanda_penduduk_: KartuTandaPendudukModel;

  @OneToOne(type => Profile)
  @JoinColumn()
  profile_: ProfileModel;

  @Expose()
  get _email(): string {
    return this.email;
  }

}
