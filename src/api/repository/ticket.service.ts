import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions, EntityMetadata, FindConditions, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Ticket } from '../entities/Ticket';

import { GlobalService } from '../services/global.service';

@Injectable()
export class TicketService {

  constructor(
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
    private gs: GlobalService,
  ) {
    //
  }

  new(): Ticket {
    return new Ticket();
  }

  instance(): Repository<Ticket> {
    return this.ticketRepo;
  }

  getMetaData(): EntityMetadata {
    return this.ticketRepo.metadata;
  }

  find(options: FindManyOptions<Ticket>): Promise<Ticket[]> {
    this.gs.log('[TICKET_SERVICE-FIND_ALL] 💉', options);
    return this.ticketRepo.find(options);
  }

  findAndCount(options: FindManyOptions<Ticket>): Promise<[Ticket[], number]> {
    this.gs.log('[TICKET_SERVICE-FIND_AND_COUNT] 💉', options);
    return this.ticketRepo.findAndCount(options);
  }

  findOneOrFail(options: FindOneOptions<Ticket>): Promise<Ticket> {
    this.gs.log('[TICKET_SERVICE-GET_BY] 💉', options);
    return this.ticketRepo.findOneOrFail(options);
  }

  save<T = Ticket | Ticket[]>(ticket: T): Promise<T> {
    this.gs.log('[TICKET_SERVICE-SAVE] 💉', ticket);
    return this.ticketRepo.save(ticket);
  }

  count(options: FindManyOptions<Ticket>): Promise<number> {
    this.gs.log('[TICKET_SERVICE-COUNT] 💉', options);
    return this.ticketRepo.count(options);
  }

  remove(ticket: Ticket | Ticket[]): Promise<Ticket | Ticket[]> {
    this.gs.log('[TICKET_SERVICE-REMOVE] 💉', ticket);
    return this.ticketRepo.softRemove(ticket as any);
  }

  query(query: string, parameters: any = []): Promise<any> {
    this.gs.log('[TICKET_SERVICE-QUERY] 💉', query);
    return this.ticketRepo.query(query, parameters);
  }

  update(criteria: FindConditions<Ticket>, partialEntity: QueryDeepPartialEntity<Ticket>): Promise<UpdateResult> {
    this.gs.log('[TICKET_SERVICE-UPDATE] 💉', criteria);
    return this.ticketRepo.update(criteria, partialEntity);
  }

  insert(ticket: Ticket): Promise<InsertResult> {
    this.gs.log('[TICKET_SERVICE-INSERT] 💉', ticket);
    return this.ticketRepo.insert(ticket);
  }

}
