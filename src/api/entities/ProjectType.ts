import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectTypeModel } from '../../models/req-res.model';

@Entity({ name: 'project_types' })
export class ProjectType implements ProjectTypeModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', default: '// No Description' })
  description: string;

  @Column({ type: 'text', default: '/favicon.ico' })
  image_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

}
