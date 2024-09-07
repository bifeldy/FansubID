import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from 'typeorm';

import { IpoChanTransformer } from '../transformers/ipo-chan.transformer';

import { ProjectTypeModel } from '../../models/req-res.model';

@Entity({ name: 'project_types' })
export class ProjectType implements ProjectTypeModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', default: '// No Description' })
  description: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png', transformer: new IpoChanTransformer() })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;

}
