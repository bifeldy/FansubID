import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AnimeModel } from '../../models/req-res.model';

@Entity({ name: 'anime' })
export class Anime implements AnimeModel {

  @Column({ primary: true, type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
