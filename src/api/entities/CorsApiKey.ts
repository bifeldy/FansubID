import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cors_api_key' })
export class CorsApiKey {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  domain: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  // tslint:disable-next-line: variable-name
  api_key: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // tslint:disable-next-line: variable-name
  updated_at: number;
}
