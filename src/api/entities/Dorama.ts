import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { DoramaModel } from '../../models/req-res.model';

@Entity({ name: 'dorama' })
export class Dorama implements DoramaModel {

  @Column({ primary: true, type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
