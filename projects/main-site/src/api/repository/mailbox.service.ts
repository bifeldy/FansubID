import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Mailbox } from '../entities/Mailbox';

import { GlobalService } from '../services/global.service';

@Injectable()
export class MailboxService {

  constructor(
    @InjectRepository(Mailbox) private mailboxRepo: Repository<Mailbox>,
    private gs: GlobalService
  ) {
    //
  }

  new(): Mailbox {
    return new Mailbox();
  }

  instance(): Repository<Mailbox> {
    return this.mailboxRepo;
  }

  getMetaData(): EntityMetadata {
    return this.mailboxRepo.metadata;
  }

  find(options: FindManyOptions<Mailbox>): Promise<Mailbox[]> {
    this.gs.log('[MAILBOX_SERVICE-FIND_ALL] 💾', options);
    return this.mailboxRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Mailbox>): Promise<[Mailbox[], number]> {
    this.gs.log('[MAILBOX_SERVICE-FIND_AND_COUNT] 💾', options);
    return this.mailboxRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Mailbox>): Promise<Mailbox> {
    this.gs.log('[MAILBOX_SERVICE-GET_BY] 💾', options);
    return this.mailboxRepo.findOneOrFail(options);
  }

  save<T = Mailbox | Mailbox[]>(mailbox: T): Promise<T> {
    this.gs.log('[MAILBOX_SERVICE-SAVE] 💾', mailbox);
    return this.mailboxRepo.save(mailbox);
  }

  count(options: FindManyOptions<Mailbox>): Promise<number> {
    this.gs.log('[MAILBOX_SERVICE-COUNT] 💾', options);
    return this.mailboxRepo.count(options);
  }

  remove(mailbox: Mailbox | Mailbox[]): Promise<Mailbox | Mailbox[]> {
    this.gs.log('[MAILBOX_SERVICE-REMOVE] 💾', mailbox);
    return this.mailboxRepo.remove(mailbox as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[MAILBOX_SERVICE-QUERY] 💾', query);
    return this.mailboxRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Mailbox>, partialEntity: QueryDeepPartialEntity<Mailbox>): Promise<UpdateResult> {
    this.gs.log('[MAILBOX_SERVICE-UPDATE] 💾', criteria);
    return this.mailboxRepo.update(criteria, partialEntity);
  }

  insert(mailbox: Mailbox): Promise<InsertResult> {
    this.gs.log('[MAILBOX_SERVICE-INSERT] 💾', mailbox);
    return this.mailboxRepo.insert(mailbox);
  }

}
