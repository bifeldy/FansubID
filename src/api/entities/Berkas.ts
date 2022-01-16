import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

import { User } from './User';
import { Fansub } from './Fansub';
import { ProjectType } from './ProjectType';
import { Anime } from './Anime';
import { Dorama } from './Dorama';
import { Attachment } from './Attachment';

@Entity({ name: 'berkas' })
export class Berkas {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  private: boolean;

  @Column({ type: 'text' })
  download_url: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;

  @ManyToOne(type => ProjectType)
  project_type_: ProjectType;

  @ManyToOne(type => Anime)
  anime_: Anime;

  @ManyToOne(type => Dorama)
  dorama_: Dorama;

  @ManyToMany(type => Fansub)
  @JoinTable()
  fansub_: Fansub[];

  @ManyToOne(type => User)
  user_: User;

  @OneToOne(type => Attachment)
  @JoinColumn()
  attachment_: Attachment;
}
