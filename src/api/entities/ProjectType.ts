import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { ProjectTypeModel } from '../../models/req-res.model';

@Entity({ name: 'project_types' })
export class ProjectType implements ProjectTypeModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', default: '// No Description' })
  description: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
