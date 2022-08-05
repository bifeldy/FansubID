import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Track } from '../entities/Track';

import { GlobalService } from '../services/global.service';

@Injectable()
export class TrackService {

  constructor(
    @InjectRepository(Track) private trackRepo: Repository<Track>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Track {
    return new Track();
  }

  instance(): Repository<Track> {
    return this.trackRepo;
  }

  getMetaData(): EntityMetadata {
    return this.trackRepo.metadata;
  }

  find(options: FindManyOptions<Track>) {
    this.gs.log('[TRACK_SERVICE-FIND_ALL] 🛤', options);
    return this.trackRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Track>) {
    this.gs.log('[TRACK_SERVICE-FIND_AND_COUNT] 🛤', options);
    return this.trackRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Track>) {
    this.gs.log('[TRACK_SERVICE-GET_BY] 🛤', options);
    return this.trackRepo.findOneOrFail(options);
  }

  save(track: Track): Promise<Track> {
    this.gs.log('[TRACK_SERVICE-SAVE] 🛤', track);
    return this.trackRepo.save(track);
  }

  count(options: FindManyOptions<Track>): Promise<number> {
    this.gs.log('[TRACK_SERVICE-COUNT] 🛤', options);
    return this.trackRepo.count(options);
  }

  remove(track: Track | Track[]): Promise<Track | Track[]> {
    this.gs.log('[TRACK_SERVICE-REMOVE] 🛤', track);
    return this.trackRepo.remove(track as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[TRACK_SERVICE-QUERY] 🛤', query);
    return this.trackRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Track>, partialEntity: QueryDeepPartialEntity<Track>): Promise<UpdateResult> {
    this.gs.log('[TRACK_SERVICE-UPDATE] 🛤', criteria);
    return this.trackRepo.update(criteria, partialEntity);
  }

  insert(trackRepo: Track): Promise<InsertResult> {
    this.gs.log('[TRACK_SERVICE-INSERT] 🛤', trackRepo);
    return this.trackRepo.insert(trackRepo);
  }

}
