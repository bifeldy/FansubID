import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Anime } from '../entities/Anime';

import { GlobalService } from '../services/global.service';

@Injectable()
export class AnimeService {

  constructor(
    @InjectRepository(Anime) private animeRepo: Repository<Anime>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Anime {
    return new Anime();
  }

  instance(): Repository<Anime> {
    return this.animeRepo;
  }

  getMetaData(): EntityMetadata {
    return this.animeRepo.metadata;
  }

  find(options: FindManyOptions<Anime>): Promise<Anime[]> {
    this.gs.log('[ANIME_SERVICE-FIND_ALL] 🐱‍👤', options);
    return this.animeRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Anime>): Promise<[Anime[], number]> {
    this.gs.log('[ANIME_SERVICE-FIND_AND_COUNT] 🐱‍👤', options);
    return this.animeRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Anime>): Promise<Anime> {
    this.gs.log('[ANIME_SERVICE-GET_BY] 🐱‍👤', options);
    return this.animeRepo.findOneOrFail(options);
  }

  save<T = Anime | Anime[]>(anime: T): Promise<T> {
    this.gs.log('[ANIME_SERVICE-SAVE] 🐱‍👤', anime);
    return this.animeRepo.save(anime);
  }

  count(options: FindManyOptions<Anime>): Promise<number> {
    this.gs.log('[ANIME_SERVICE-COUNT] 🐱‍👤', options);
    return this.animeRepo.count(options);
  }

  remove(anime: Anime | Anime[]): Promise<Anime | Anime[]> {
    this.gs.log('[ANIME_SERVICE-REMOVE] 🐱‍👤', anime);
    return this.animeRepo.remove(anime as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[ANIME_SERVICE-QUERY] 🐱‍👤', query);
    return this.animeRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Anime>, partialEntity: QueryDeepPartialEntity<Anime>): Promise<UpdateResult> {
    this.gs.log('[ANIME_SERVICE-UPDATE] 🐱‍👤', criteria);
    return this.animeRepo.update(criteria, partialEntity);
  }

  insert(anime: Anime): Promise<InsertResult> {
    this.gs.log('[ANIME_SERVICE-INSERT] 🐱‍👤', anime);
    return this.animeRepo.insert(anime);
  }

}
