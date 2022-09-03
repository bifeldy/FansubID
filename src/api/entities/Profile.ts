import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { ProfileModel } from '../../models/req-res.model';

@Entity({ name: 'profile' })
export class Profile implements ProfileModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', default: '// No Description' })
  description: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  cover_url: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @Column({ type: 'int', default: 0 })
  points: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
