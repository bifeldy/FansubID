import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { DdlFile } from '../entities/DdlFile';

import { GlobalService } from '../services/global.service';

@Injectable()
export class DdlFileService {

  constructor(
    @InjectRepository(DdlFile) private ddlFileRepo: Repository<DdlFile>,
    private gs: GlobalService
  ) {
    //
  }

  new(): DdlFile {
    return new DdlFile();
  }

  instance(): Repository<DdlFile> {
    return this.ddlFileRepo;
  }

  getMetaData(): EntityMetadata {
    return this.ddlFileRepo.metadata;
  }

  find(options: FindManyOptions<DdlFile>) {
    this.gs.log('[DDL_FILE_SERVICE-FIND_ALL] 💾', options);
    return this.ddlFileRepo.find(options);
  }

  findAndCount(options: FindManyOptions<DdlFile>) {
    this.gs.log('[DDL_FILE_SERVICE-FIND_AND_COUNT] 💾', options);
    return this.ddlFileRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<DdlFile>): Promise<DdlFile> {
    this.gs.log('[DDL_FILE_SERVICE-GET_BY] 💾', options);
    return this.ddlFileRepo.findOneOrFail(options);
  }

  save<T = DdlFile | DdlFile[]>(ddlFile: T): Promise<T> {
    this.gs.log('[DDL_FILE_SERVICE-SAVE] 💾', ddlFile);
    return this.ddlFileRepo.save(ddlFile);
  }

  count(options: FindManyOptions<DdlFile>): Promise<number> {
    this.gs.log('[DDL_FILE_SERVICE-COUNT] 💾', options);
    return this.ddlFileRepo.count(options);
  }

  remove(ddlFile: DdlFile | DdlFile[]): Promise<DdlFile | DdlFile[]> {
    this.gs.log('[DDL_FILE_SERVICE-REMOVE] 💾', ddlFile);
    return this.ddlFileRepo.remove(ddlFile as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[DDL_FILE_SERVICE-QUERY] 💾', query);
    return this.ddlFileRepo.query(query, parameters);
  }

  update(criteria: FindConditions<DdlFile>, partialEntity: QueryDeepPartialEntity<DdlFile>): Promise<UpdateResult> {
    this.gs.log('[DDL_FILE_SERVICE-UPDATE] 💾', criteria);
    return this.ddlFileRepo.update(criteria, partialEntity);
  }

  insert(ddlFile: DdlFile): Promise<InsertResult> {
    this.gs.log('[DDL_FILE_SERVICE-INSERT] 💾', ddlFile);
    return this.ddlFileRepo.insert(ddlFile);
  }

}
