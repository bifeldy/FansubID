import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { KartuTandaPenduduk } from './KartuTandaPenduduk';
import { Profile } from './Profile';

import { Role } from '../../app/_shared/models/Role';

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  image_url: string;

  @Column({ type: 'enum', enum: [
    Role.ADMIN, Role.MODERATOR,
    Role.FANSUBBER, Role.USER
  ], default: Role.USER })
  role: Role;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'varchar', nullable: true, default: null, unique: true })
  discord: string;

  @Column({ type: 'text', nullable: true })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  session_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  updated_at: number;

  @OneToOne(type => KartuTandaPenduduk)
  @JoinColumn()
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  kartu_tanda_penduduk_: KartuTandaPenduduk;

  @OneToOne(type => Profile)
  @JoinColumn()
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  profile_: Profile;
}
