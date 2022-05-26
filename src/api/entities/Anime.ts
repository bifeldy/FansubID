import { Entity, Column } from 'typeorm';

import { AnimeModel } from '../../models/req-res.model';

@Entity({ name: 'anime' })
export class Anime implements AnimeModel {

  @Column({ primary: true, type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'text', default: '/favicon.ico' })
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

}
