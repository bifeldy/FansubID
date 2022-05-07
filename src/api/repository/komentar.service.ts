import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Komentar } from '../entities/Komentar';

import { GlobalService } from '../services/global.service';

@Injectable()
export class KomentarService {

  constructor(
    @InjectRepository(Komentar) private komentarRepo: Repository<Komentar>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Komentar {
    return new Komentar();
  }

  instance(): Repository<Komentar> {
    return this.komentarRepo;
  }

  getMetaData(): EntityMetadata {
    return this.komentarRepo.metadata;
  }

  find(options: FindManyOptions<Komentar>) {
    this.gs.log('[KOMENTAR_SERVICE-FIND_ALL] 💬', options);
    return this.komentarRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Komentar>) {
    this.gs.log('[KOMENTAR_SERVICE-FIND_AND_COUNT] 💬', options);
    return this.komentarRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Komentar>) {
    this.gs.log('[KOMENTAR_SERVICE-GET_BY] 💬', options);
    return this.komentarRepo.findOneOrFail(options);
  }

  save(komentar: Komentar): Promise<Komentar> {
    this.gs.log('[KOMENTAR_SERVICE-SAVE] 💬', komentar);
    return this.komentarRepo.save(komentar);
  }

  count(options: FindManyOptions<Komentar>): Promise<number> {
    this.gs.log('[KOMENTAR_SERVICE-COUNT] 💬', options);
    return this.komentarRepo.count(options);
  }

  remove(komentar: Komentar): Promise<Komentar> {
    this.gs.log('[KOMENTAR_SERVICE-REMOVE] 💬', komentar);
    return this.komentarRepo.remove(komentar);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[KOMENTAR_SERVICE-QUERY] 💬', query);
    return this.komentarRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Komentar>, partialEntity: QueryDeepPartialEntity<Komentar>): Promise<UpdateResult> {
    this.gs.log('[KOMENTAR_SERVICE-UPDATE] 💬', criteria);
    return this.komentarRepo.update(criteria, partialEntity);
  }

  insert(komentar: Komentar): Promise<InsertResult> {
    this.gs.log('[KOMENTAR_SERVICE-INSERT] 💬', komentar);
    return this.komentarRepo.insert(komentar);
  }

}
