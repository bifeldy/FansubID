import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { AttachmentFanshare } from '../entities/AttachmentFanshare';

import { GlobalService } from '../services/global.service';

@Injectable()
export class AttachmentFanshareService {

  constructor(
    @InjectRepository(AttachmentFanshare) private attachmentRepo: Repository<AttachmentFanshare>,
    private gs: GlobalService
  ) {
    //
  }

  new(): AttachmentFanshare {
    return new AttachmentFanshare();
  }

  instance(): Repository<AttachmentFanshare> {
    return this.attachmentRepo;
  }

  getMetaData(): EntityMetadata {
    return this.attachmentRepo.metadata;
  }

  find(options: FindManyOptions<AttachmentFanshare>): Promise<AttachmentFanshare[]> {
    if (!options.withDeleted) {
      options.withDeleted = false;
    }
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-FIND_ALL] 📁', options);
    return this.attachmentRepo.find(options);
  }

  findAndCount(options: FindManyOptions<AttachmentFanshare>): Promise<[AttachmentFanshare[], number]> {
    if (!options.withDeleted) {
      options.withDeleted = false;
    }
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-FIND_AND_COUNT] 📁', options);
    return this.attachmentRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<AttachmentFanshare>): Promise<AttachmentFanshare> {
    if (!options.withDeleted) {
      options.withDeleted = false;
    }
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-GET_BY] 📁', options);
    return this.attachmentRepo.findOneOrFail(options);
  }

  save<T = AttachmentFanshare | AttachmentFanshare[]>(AttachmentFanshare: T): Promise<T> {
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-SAVE] 📁', AttachmentFanshare);
    return this.attachmentRepo.save(AttachmentFanshare);
  }

  count(options: FindManyOptions<AttachmentFanshare>): Promise<number> {
    if (!options.withDeleted) {
      options.withDeleted = false;
    }
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-COUNT] 📁', options);
    return this.attachmentRepo.count(options);
  }

  remove(AttachmentFanshare: AttachmentFanshare | AttachmentFanshare[]): Promise<AttachmentFanshare | AttachmentFanshare[]> {
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-REMOVE] 📁', AttachmentFanshare);
    return this.attachmentRepo.softRemove(AttachmentFanshare as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-QUERY] 📁', query);
    return this.attachmentRepo.query(query, parameters);
  }

  update(criteria: FindConditions<AttachmentFanshare>, partialEntity: QueryDeepPartialEntity<AttachmentFanshare>): Promise<UpdateResult> {
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-UPDATE] 📁', criteria);
    return this.attachmentRepo.update(criteria, partialEntity);
  }

  insert(AttachmentFanshare: AttachmentFanshare): Promise<InsertResult> {
    this.gs.log('[ATTACHMENT_FANSHARE_SERVICE-INSERT] 📁', AttachmentFanshare);
    return this.attachmentRepo.insert(AttachmentFanshare);
  }

}
