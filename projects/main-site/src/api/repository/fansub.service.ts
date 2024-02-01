import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Fansub } from '../entities/Fansub';

import { GlobalService } from '../services/global.service';

@Injectable()
export class FansubService {

  constructor(
    @InjectRepository(Fansub) private fansubRepo: Repository<Fansub>,
    private gs: GlobalService,
  ) {
    // this.migrateUrlFansub().catch(console.error);
  }

  // async migrateUrlFansub(): Promise<void> {
  //   const fs = await this.fansubRepo.find({
  //     where: [
  //       { urls: Not(IsNull()) }
  //     ]
  //   });
  //   for (const f of fs) {
  //     const urls = JSON.parse(f.urls);
  //     const u = {};
  //     for (const url of urls) {
  //       u[url.name] = url.url;
  //     }
  //     f.urls = JSON.stringify(u);
  //   }
  //   await this.fansubRepo.save(fs);
  // }

  new(): Fansub {
    return new Fansub();
  }

  instance(): Repository<Fansub> {
    return this.fansubRepo;
  }

  getMetaData(): EntityMetadata {
    return this.fansubRepo.metadata;
  }

  find(options: FindManyOptions<Fansub>, withDeleted = false): Promise<Fansub[]> {
    options.withDeleted = withDeleted;
    this.gs.log('[FANSUB_SERVICE-FIND_ALL] 🍿', options);
    return this.fansubRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Fansub>, withDeleted = false): Promise<[Fansub[], number]> {
    options.withDeleted = withDeleted;
    this.gs.log('[FANSUB_SERVICE-FIND_AND_COUNT] 🍿', options);
    return this.fansubRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Fansub>, withDeleted = false): Promise<Fansub> {
    options.withDeleted = withDeleted;
    this.gs.log('[FANSUB_SERVICE-GET_BY] 🍿', options);
    return this.fansubRepo.findOneOrFail(options);
  }

  save<T = Fansub | Fansub[]>(fansub: T): Promise<T> {
    this.gs.log('[FANSUB_SERVICE-SAVE] 🍿', fansub);
    return this.fansubRepo.save(fansub);
  }

  count(options: FindManyOptions<Fansub>): Promise<number> {
    this.gs.log('[FANSUB_SERVICE-COUNT] 🍿', options);
    return this.fansubRepo.count(options);
  }

  remove(fansub: Fansub | Fansub[]): Promise<Fansub | Fansub[]> {
    this.gs.log('[FANSUB_SERVICE-REMOVE] 🍿', fansub);
    return this.fansubRepo.softRemove(fansub as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[FANSUB_SERVICE-QUERY] 🍿', query);
    return this.fansubRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Fansub>, partialEntity: QueryDeepPartialEntity<Fansub>): Promise<UpdateResult> {
    this.gs.log('[FANSUB_SERVICE-UPDATE] 🍿', criteria);
    return this.fansubRepo.update(criteria, partialEntity);
  }

  insert(fansub: Fansub): Promise<InsertResult> {
    this.gs.log('[FANSUB_SERVICE-INSERT] 🍿', fansub);
    return this.fansubRepo.insert(fansub);
  }

}
