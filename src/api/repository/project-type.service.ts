import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { ProjectType } from '../entities/ProjectType';

import { GlobalService } from '../services/global.service';

@Injectable()
export class ProjectTypeService {

  constructor(
    @InjectRepository(ProjectType) private projectTypeRepo: Repository<ProjectType>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): ProjectType {
    return new ProjectType();
  }

  instance(): Repository<ProjectType> {
    return this.projectTypeRepo;
  }

  getMetaData(): EntityMetadata {
    return this.projectTypeRepo.metadata;
  }

  find(options: FindManyOptions<ProjectType>) {
    this.gs.log('[PROJECT_TYPE_SERVICE-FIND_ALL] 💉', options);
    return this.projectTypeRepo.find(options);
  }

  findAndCount(options: FindManyOptions<ProjectType>) {
    this.gs.log('[PROJECT_TYPE_SERVICE-FIND_AND_COUNT] 💉', options);
    return this.projectTypeRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<ProjectType>): Promise<ProjectType> {
    this.gs.log('[PROJECT_TYPE_SERVICE-GET_BY] 💉', options);
    return this.projectTypeRepo.findOneOrFail(options);
  }

  save(projectType: ProjectType): Promise<ProjectType> {
    this.gs.log('[PROJECT_TYPE_SERVICE-SAVE] 💉', projectType);
    return this.projectTypeRepo.save(projectType);
  }

  count(options: FindManyOptions<ProjectType>): Promise<number> {
    this.gs.log('[PROJECT_TYPE_SERVICE-COUNT] 💉', options);
    return this.projectTypeRepo.count(options);
  }

  remove(projectType: ProjectType | ProjectType[]): Promise<ProjectType | ProjectType[]> {
    this.gs.log('[PROJECT_TYPE_SERVICE-REMOVE] 💉', projectType);
    return this.projectTypeRepo.remove(projectType as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[PROJECT_TYPE_SERVICE-QUERY] 💉', query);
    return this.projectTypeRepo.query(query, parameters);
  }

  update(criteria: FindConditions<ProjectType>, partialEntity: QueryDeepPartialEntity<ProjectType>): Promise<UpdateResult> {
    this.gs.log('[PROJECT_TYPE_SERVICE-UPDATE] 💉', criteria);
    return this.projectTypeRepo.update(criteria, partialEntity);
  }

  insert(projectType: ProjectType): Promise<InsertResult> {
    this.gs.log('[PROJECT_TYPE_SERVICE-INSERT] 💉', projectType);
    return this.projectTypeRepo.insert(projectType);
  }

}
