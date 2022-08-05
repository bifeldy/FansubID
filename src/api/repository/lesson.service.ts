import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, FindManyOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Lesson } from '../entities/Lesson';

import { GlobalService } from '../services/global.service';

@Injectable()
export class LessonService {

  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Lesson {
    return new Lesson();
  }

  instance(): Repository<Lesson> {
    return this.lessonRepo;
  }

  getMetaData(): EntityMetadata {
    return this.lessonRepo.metadata;
  }

  find(options: FindManyOptions<Lesson>) {
    this.gs.log('[LESSON_SERVICE-FIND_ALL] 🗾', options);
    return this.lessonRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Lesson>) {
    this.gs.log('[LESSON_SERVICE-FIND_AND_COUNT] 🗾', options);
    return this.lessonRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Lesson>) {
    this.gs.log('[LESSON_SERVICE-GET_BY] 🗾', options);
    return this.lessonRepo.findOneOrFail(options);
  }

  save(lesson: Lesson): Promise<Lesson> {
    this.gs.log('[LESSON_SERVICE-SAVE] 🗾', lesson);
    return this.lessonRepo.save(lesson);
  }

  count(options: FindManyOptions<Lesson>): Promise<number> {
    this.gs.log('[LESSON_SERVICE-COUNT] 🗾', options);
    return this.lessonRepo.count(options);
  }

  remove(lesson: Lesson | Lesson[]): Promise<Lesson | Lesson[]> {
    this.gs.log('[LESSON_SERVICE-REMOVE] 🗾', lesson);
    return this.lessonRepo.remove(lesson as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[LESSON_SERVICE-QUERY] 🗾', query);
    return this.lessonRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Lesson>, partialEntity: QueryDeepPartialEntity<Lesson>): Promise<UpdateResult> {
    this.gs.log('[LESSON_SERVICE-UPDATE] 🗾', criteria);
    return this.lessonRepo.update(criteria, partialEntity);
  }

  insert(lesson: Lesson): Promise<InsertResult> {
    this.gs.log('[LESSON_SERVICE-INSERT] 🗾', lesson);
    return this.lessonRepo.insert(lesson);
  }

}
