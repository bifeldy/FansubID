import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from 'typeorm'

import { AgamaModel, GolonganDarahModel, JenisKelaminModel, KartuTandaPendudukModel, WargaNegaraModel } from '../../models/req-res.model';

import { ColumnNumberBigIntTransformer } from '../transformers/column-number-bigint.transformer';

@Entity({ name: 'kartu_tanda_penduduk' })
export class KartuTandaPenduduk implements KartuTandaPendudukModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @Column({ type: 'bigint', nullable: true, transformer: new ColumnNumberBigIntTransformer() })
  nik: number;

  @Column({ type: 'text' })
  nama: string;

  @Column({ type: 'text', nullable: true })
  tempat_lahir: string;

  @Exclude()
  @Column({ type: 'date', nullable: true })
  tanggal_lahir: Date;

  @Column({ type: 'enum', enum: JenisKelaminModel, nullable: true })
  jenis_kelamin: JenisKelaminModel;

  @Exclude()
  @Column({ type: 'enum', enum: GolonganDarahModel, nullable: true })
  golongan_darah: GolonganDarahModel;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  alamat: string;

  @Exclude()
  @Column({ type: 'smallint', nullable: true })
  rt: number;

  @Exclude()
  @Column({ type: 'smallint', nullable: true })
  rw: number;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  kelurahan_desa: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  kecamatan: string;

  @Exclude()
  @Column({ type: 'enum', enum: AgamaModel, nullable: true })
  agama: AgamaModel;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  status_perkawinan: string;

  @Exclude()
  @Column({ type: 'text', nullable: true })
  pekerjaan: string;

  @Exclude()
  @Column({ type: 'enum', enum: WargaNegaraModel, nullable: true })
  kewarganegaraan: WargaNegaraModel;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  @Index()
  created_at: number | Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deleted_at: number | Date;
}
