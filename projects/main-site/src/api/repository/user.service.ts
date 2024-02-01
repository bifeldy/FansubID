import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { User } from '../entities/User';

import { GlobalService } from '../services/global.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): User {
    return new User();
  }

  instance(): Repository<User> {
    return this.userRepo;
  }

  getMetaData(): EntityMetadata {
    return this.userRepo.metadata;
  }

  find(options: FindManyOptions<User>, withDeleted = false): Promise<User[]> {
    options.withDeleted = withDeleted;
    this.gs.log('[USER_SERVICE-FIND_ALL] 🤖', options);
    return this.userRepo.find(options);
  }

  findAndCount(options: FindManyOptions<User>, withDeleted = false): Promise<[User[], number]> {
    options.withDeleted = withDeleted;
    this.gs.log('[USER_SERVICE-FIND_AND_COUNT] 🤖', options);
    return this.userRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<User>, withDeleted = false): Promise<User> {
    options.withDeleted = withDeleted;
    this.gs.log('[USER_SERVICE-GET_BY] 🤖', options);
    return this.userRepo.findOneOrFail(options);
  }

  save<T = User | User[]>(user: T): Promise<T> {
    this.gs.log('[USER_SERVICE-SAVE] 🤖', user);
    return this.userRepo.save(user);
  }

  count(options: FindManyOptions<User>): Promise<number> {
    this.gs.log('[USER_SERVICE-COUNT] 🤖', options);
    return this.userRepo.count(options);
  }

  remove(user: User | User[]): Promise<User | User[]> {
    this.gs.log('[USER_SERVICE-REMOVE] 🤖', user);
    return this.userRepo.softRemove(user as any);
  }

  query(query: string, parameters: any = []): Promise<any[]> {
    this.gs.log('[USER_SERVICE-QUERY] 🤖', query);
    return this.userRepo.query(query, parameters);
  }

  update(criteria: FindConditions<User>, partialEntity: QueryDeepPartialEntity<User>): Promise<UpdateResult> {
    this.gs.log('[USER_SERVICE-UPDATE] 🤖', criteria);
    return this.userRepo.update(criteria, partialEntity);
  }

  insert(user: User): Promise<InsertResult> {
    this.gs.log('[USER_SERVICE-INSERT] 🤖', user);
    return this.userRepo.insert(user);
  }

}
