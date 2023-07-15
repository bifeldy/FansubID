import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { TempAttachment } from '../entities/TempAttachment';

import { GlobalService } from '../services/global.service';

@Injectable()
export class TempAttachmentService {

  constructor(
    @InjectRepository(TempAttachment) private tempAttachmentRepo: Repository<TempAttachment>,
    private gs: GlobalService
  ) {
    //
  }

  new(): TempAttachment {
    return new TempAttachment();
  }

  instance(): Repository<TempAttachment> {
    return this.tempAttachmentRepo;
  }

  getMetaData(): EntityMetadata {
    return this.tempAttachmentRepo.metadata;
  }

  find(options: FindManyOptions<TempAttachment>): Promise<TempAttachment[]> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-FIND_ALL] 💾', options);
    return this.tempAttachmentRepo.find(options);
  }

  findAndCount(options: FindManyOptions<TempAttachment>): Promise<[TempAttachment[], number]> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-FIND_AND_COUNT] 💾', options);
    return this.tempAttachmentRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<TempAttachment>): Promise<TempAttachment> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-GET_BY] 💾', options);
    return this.tempAttachmentRepo.findOneOrFail(options);
  }

  save<T = TempAttachment | TempAttachment[]>(tempAttachment: T): Promise<T> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-SAVE] 💾', tempAttachment);
    return this.tempAttachmentRepo.save(tempAttachment);
  }

  count(options: FindManyOptions<TempAttachment>): Promise<number> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-COUNT] 💾', options);
    return this.tempAttachmentRepo.count(options);
  }

  remove(tempAttachment: TempAttachment |TempAttachment[]): Promise<TempAttachment |TempAttachment[]> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-REMOVE] 💾', tempAttachment);
    return this.tempAttachmentRepo.remove(tempAttachment as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-QUERY] 💾', query);
    return this.tempAttachmentRepo.query(query, parameters);
  }

  update(criteria: FindConditions<TempAttachment>, partialEntity: QueryDeepPartialEntity<TempAttachment>): Promise<UpdateResult> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-UPDATE] 💾', criteria);
    return this.tempAttachmentRepo.update(criteria, partialEntity);
  }

  insert(tempAttachment: TempAttachment): Promise<InsertResult> {
    this.gs.log('[TEMP_ATTACHMENT_SERVICE-INSERT] 💾', tempAttachment);
    return this.tempAttachmentRepo.insert(tempAttachment);
  }

}
