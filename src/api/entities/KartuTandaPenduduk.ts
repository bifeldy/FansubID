import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AgamaModel, GolonganDarahModel, JenisKelaminModel, KartuTandaPendudukModel, WargaNegaraModel } from '../../models/req-res.model';

@Entity({ name: 'kartu_tanda_penduduk' })
export class KartuTandaPenduduk implements KartuTandaPendudukModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', nullable: true })
  nik: number;

  @Column({ type: 'varchar', length: 255 })
  nama: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tempat_lahir: string;

  @Column({ type: 'date', nullable: true })
  tanggal_lahir: Date;

  @Column({ type: 'enum', enum: JenisKelaminModel, nullable: true })
  jenis_kelamin: JenisKelaminModel;

  @Column({ type: 'enum', enum: GolonganDarahModel, nullable: true })
  golongan_darah: GolonganDarahModel;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alamat: string;

  @Column({ type: 'smallint', nullable: true })
  rt: number;

  @Column({ type: 'smallint', nullable: true })
  rw: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kelurahan_desa: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  kecamatan: string;

  @Column({ type: 'enum', enum: AgamaModel, nullable: true })
  agama: AgamaModel;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status_perkawinan: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pekerjaan: string;

  @Column({ type: 'enum', enum: WargaNegaraModel, nullable: true })
  kewarganegaraan: WargaNegaraModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number;
}
