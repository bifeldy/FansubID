import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

import { FailToBanModel } from '../../models/req-res.model';

@Entity({ name: 'fail_to_ban' })
export class FailToBan implements FailToBanModel {

  @PrimaryColumn({ type: 'text' })
  ip_domain: string;

  @Column({ type: 'int', default: 0 })
  fail_count: number;

  @Column({ type: 'text', nullable: true })
  rule_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

}
