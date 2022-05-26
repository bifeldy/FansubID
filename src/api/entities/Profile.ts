import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { ProfileModel } from '../../models/req-res.model';

@Entity({ name: 'profile' })
export class Profile implements ProfileModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', default: '// No Description' })
  description: string;

  @Column({ type: 'text', default: '/favicon.ico' })
  cover_url: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

}
