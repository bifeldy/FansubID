import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

import { AnimeModel, AttachmentModel, BerkasModel, DoramaModel, FansubModel, ProjectTypeModel, UserModel } from '../../models/req-res.model';

import { Anime } from './Anime';
import { Attachment } from './Attachment';
import { Dorama } from './Dorama';
import { Fansub } from './Fansub';
import { ProjectType } from './ProjectType';
import { User } from './User';

@Entity({ name: 'berkas' })
export class Berkas implements BerkasModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  private: boolean;

  @Column({ type: 'boolean', default: false })
  r18: boolean;

  @Column({ type: 'text' })
  download_url: string;

  @Column({ type: 'text', default: '/assets/img/favicon.png' })
  image_url: string;

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'int', default: 0 })
  like_count: number;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;

  @ManyToOne(type => ProjectType)
  project_type_: ProjectTypeModel;

  @ManyToOne(type => Anime)
  anime_: AnimeModel;

  @ManyToOne(type => Dorama)
  dorama_: DoramaModel;

  @ManyToMany(type => Fansub)
  @JoinTable()
  fansub_: FansubModel[];

  @ManyToOne(type => User)
  user_: UserModel;

  @OneToOne(type => Attachment)
  @JoinColumn()
  attachment_: AttachmentModel;

}
