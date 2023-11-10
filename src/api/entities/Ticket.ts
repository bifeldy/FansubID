import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, DeleteDateColumn, Generated, Index } from 'typeorm'

import { TicketModel, UserModel } from '../../models/req-res.model';

import { User } from './User';

@Entity({ name: 'ticket' })
export class Ticket implements TicketModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text' })
  reported_issue: string;

  @Column({ type: 'text', nullable: true })
  expected_solution: string;

  @Column({ type: 'text', nullable: true })
  final_decision: string;

  @Column({ type: 'boolean', default: false })
  finished: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;

  @Exclude()
  @Column({ type: 'text' })
  contact_email: string;

  @Column()
  @Generated('uuid')
  secret: string;

  @ManyToOne(type => User)
  user_: UserModel;

}
