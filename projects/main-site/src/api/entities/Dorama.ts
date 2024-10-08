import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Index } from 'typeorm';

import { IpoChanTransformer } from '../transformers/ipo-chan.transformer';

import { DoramaModel } from '../../models/req-res.model';

@Entity({ name: 'dorama' })
export class Dorama implements DoramaModel {

  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  slug: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  type: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png', transformer: new IpoChanTransformer() })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
