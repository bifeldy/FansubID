import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Notification } from '../entities/Notification';

import { GlobalService } from '../services/global.service';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(Notification) private notificationRepo: Repository<Notification>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Notification {
    return new Notification();
  }

  instance(): Repository<Notification> {
    return this.notificationRepo;
  }

  getMetaData(): EntityMetadata {
    return this.notificationRepo.metadata;
  }

  find(options: FindManyOptions<Notification>): Promise<Notification[]> {
    this.gs.log('[NOTIFICATION_SERVICE-FIND_ALL] 🔔', options);
    return this.notificationRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Notification>): Promise<[Notification[], number]> {
    this.gs.log('[NOTIFICATION_SERVICE-FIND_AND_COUNT] 🔔', options);
    return this.notificationRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Notification>): Promise<Notification> {
    this.gs.log('[NOTIFICATION_SERVICE-GET_BY] 🔔', options);
    return this.notificationRepo.findOneOrFail(options);
  }

  save<T = Notification | Notification[]>(notification: T): Promise<T> {
    this.gs.log('[NOTIFICATION_SERVICE-SAVE] 🔔', notification);
    return this.notificationRepo.save(notification);
  }

  count(options: FindManyOptions<Notification>): Promise<number> {
    this.gs.log('[NOTIFICATION_SERVICE-COUNT] 🔔', options);
    return this.notificationRepo.count(options);
  }

  remove(notification: Notification | Notification[]): Promise<Notification | Notification[]> {
    this.gs.log('[NOTIFICATION_SERVICE-REMOVE] 🔔', notification);
    return this.notificationRepo.softRemove(notification as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[NOTIFICATION_SERVICE-QUERY] 🔔', query);
    return this.notificationRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Notification>, partialEntity: QueryDeepPartialEntity<Notification>): Promise<UpdateResult> {
    this.gs.log('[NOTIFICATION_SERVICE-UPDATE] 🔔', criteria);
    return this.notificationRepo.update(criteria, partialEntity);
  }

  insert(notification: Notification): Promise<InsertResult> {
    this.gs.log('[NOTIFICATION_SERVICE-INSERT] 🔔', notification);
    return this.notificationRepo.insert(notification);
  }

}
