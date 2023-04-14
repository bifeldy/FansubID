import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Attachment } from '../entities/Attachment';

import { GlobalService } from '../services/global.service';

@Injectable()
export class AttachmentService {

  constructor(
    @InjectRepository(Attachment) private attachmentRepo: Repository<Attachment>,
    private gs: GlobalService
  ) {
    //
  }

  new(): Attachment {
    return new Attachment();
  }

  instance(): Repository<Attachment> {
    return this.attachmentRepo;
  }

  getMetaData(): EntityMetadata {
    return this.attachmentRepo.metadata;
  }

  find(options: FindManyOptions<Attachment>) {
    this.gs.log('[ATTACHMENT_SERVICE-FIND_ALL] 💾', options);
    return this.attachmentRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Attachment>) {
    this.gs.log('[ATTACHMENT_SERVICE-FIND_AND_COUNT] 💾', options);
    return this.attachmentRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Attachment>): Promise<Attachment> {
    this.gs.log('[ATTACHMENT_SERVICE-GET_BY] 💾', options);
    return this.attachmentRepo.findOneOrFail(options);
  }

  save<T = Attachment | Attachment[]>(attachment: T): Promise<T> {
    this.gs.log('[ATTACHMENT_SERVICE-SAVE] 💾', attachment);
    return this.attachmentRepo.save(attachment);
  }

  count(options: FindManyOptions<Attachment>): Promise<number> {
    this.gs.log('[ATTACHMENT_SERVICE-COUNT] 💾', options);
    return this.attachmentRepo.count(options);
  }

  remove(attachment: Attachment | Attachment[]): Promise<Attachment | Attachment[]> {
    this.gs.log('[ATTACHMENT_SERVICE-REMOVE] 💾', attachment);
    return this.attachmentRepo.remove(attachment as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[ATTACHMENT_SERVICE-QUERY] 💾', query);
    return this.attachmentRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Attachment>, partialEntity: QueryDeepPartialEntity<Attachment>): Promise<UpdateResult> {
    this.gs.log('[ATTACHMENT_SERVICE-UPDATE] 💾', criteria);
    return this.attachmentRepo.update(criteria, partialEntity);
  }

  insert(attachment: Attachment): Promise<InsertResult> {
    this.gs.log('[ATTACHMENT_SERVICE-INSERT] 💾', attachment);
    return this.attachmentRepo.insert(attachment);
  }

}
