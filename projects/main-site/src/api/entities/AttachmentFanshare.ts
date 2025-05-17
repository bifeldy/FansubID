import { Entity, Column, ManyToOne, PrimaryColumn, Index } from 'typeorm';

import { AttachmentFanshareModel, UserModel } from '../../models/req-res.model';

import { ColumnNumberBigIntTransformer } from '../transformers/column-number-bigint.transformer';

import { User } from './User';

@Entity({ name: 'attachment_fanshare' })
export class AttachmentFanshare implements AttachmentFanshareModel {

  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  orig: string;

  @Column({ type: 'bigint', transformer: new ColumnNumberBigIntTransformer() })
  size: number;

  @Column({ type: 'text' })
  mime: string;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'timestamp with time zone' })
  @Index()
  created_at: number | Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  @Index()
  expired_at: number | Date;

  @ManyToOne(type => User)
  user_: UserModel;

}
