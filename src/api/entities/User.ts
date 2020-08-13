import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { KartuTandaPenduduk } from './KartuTandaPenduduk';

enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  FANSUBBER = 'FANSUBBER',
  USER = 'USER'
}

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'text', nullable: true })
  // tslint:disable-next-line: variable-name
  image_url: string;

  @Column({ type: 'enum', enum: ['ADMIN', 'MODERATOR', 'FANSUBBER', 'USER'], default: 'USER' })
  role: Role;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'text', nullable: true })
  // tslint:disable-next-line: variable-name
  session_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // // tslint:disable-next-line: variable-name
  // updated_at: number;

  @OneToOne(type => KartuTandaPenduduk)
  @JoinColumn()
  // tslint:disable-next-line: variable-name
  kartu_tanda_penduduk_: KartuTandaPenduduk;
}
