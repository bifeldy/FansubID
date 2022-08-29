import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { AgamaModel, GolonganDarahModel, JenisKelaminModel, KartuTandaPendudukModel, WargaNegaraModel } from '../../models/req-res.model';

@Entity({ name: 'kartu_tanda_penduduk' })
export class KartuTandaPenduduk implements KartuTandaPendudukModel {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @Column({ type: 'bigint', nullable: true })
  nik: number;

  @Column({ type: 'varchar', length: 255 })
  nama: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
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
  @Column({ type: 'varchar', length: 255, nullable: true })
  alamat: string;

  @Exclude()
  @Column({ type: 'smallint', nullable: true })
  rt: number;

  @Exclude()
  @Column({ type: 'smallint', nullable: true })
  rw: number;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  kelurahan_desa: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  kecamatan: string;

  @Exclude()
  @Column({ type: 'enum', enum: AgamaModel, nullable: true })
  agama: AgamaModel;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  status_perkawinan: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  pekerjaan: string;

  @Exclude()
  @Column({ type: 'enum', enum: WargaNegaraModel, nullable: true })
  kewarganegaraan: WargaNegaraModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number | Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: number | Date;
}
