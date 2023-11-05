import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { TicketService } from '../repository/ticket.service';
import { ApiKeyService } from '../repository/api-key.service';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';
import { MailService } from '../services/mail.service';

@ApiExcludeController()
@Controller('/ticket')
export class TicketController {

  constructor(
    private ticketRepo: TicketService,
    private aks: ApiKeyService,
    private api: ApiService,
    private gs: GlobalService,
    private ms: MailService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const sqlWhere: any[] = [
        { url: ILike(`%${searchQuery}%`) },
        { reported_issue: ILike(`%${searchQuery}%`) },
        { expected_solution: ILike(`%${searchQuery}%`) },
        { final_decision: ILike(`%${searchQuery}%`) },
        { contact_email: ILike(`%${searchQuery}%`) }
      ];
      for (const sw of sqlWhere) {
        if (req.query['finished'] === 'true') {
          sw.finished = true;
        }
        if (user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR) {
          sw.user_ = {
            id: Equal(user.id)
          };
        }
      }
      const [tickets, count] = await this.ticketRepo.findAndCount({
        where: sqlWhere,
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            url: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const t of tickets) {
        if ('user_' in t && t.user_) {
          delete t.user_.created_at;
          delete t.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Ticket API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: tickets
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Ticket API :: Gagal Mendapatkan All Ticket 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'url' in req.body &&
        'reported_issue' in req.body &&
        'contact_email' in req.body &&
        'g-recaptcha-response' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        const url = new URL(environment.reCaptcha.api_url);
        url.searchParams.append('secret', environment.reCaptcha.secret_key);
        url.searchParams.append('response', req.body['g-recaptcha-response']);
        url.searchParams.append('remoteip', this.aks.getOriginIpCc(req, true).origin_ip);
        const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[gCaptcha] 🎲 ${res_raw.status}`, res_json);
          const email: string = req.body.contact_email;
          if (!email.match(CONSTANTS.regexEmail)) {
            throw new Error('Alamat Surel Tidak Valid!');
          }
          let reported_url: string = req.body.url;
          if (!reported_url.match(CONSTANTS.regexUrl)) {
            throw new Error('Alamat URL Tidak Valid!');
          }
          reported_url = this.gs.cleanUpUrlStringRecord(reported_url);
          const urlRules = [
            `${environment.domain}/berkas/*`,
            `${environment.domain}/fansub/*`,
            `${environment.domain}/user/*`,
            `*.${environment.domain}*`
          ];
          if (!this.gs.matchRuleOneOf(reported_url, urlRules)) {
            throw new HttpException({
              info: `🙄 403 - Ticket API :: Tidak Dapat Membuat Ticket Baru 😪`,
              result: {
                message: `URL Yang Bisa Di Laporkan Hanya ${urlRules.join(', ')}!`
              }
            }, HttpStatus.FORBIDDEN);
          }
          const ticket = this.ticketRepo.new();
          ticket.reported_issue = req.body.reported_issue;
          ticket.url = reported_url;
          ticket.contact_email = email;
          if ('expected_solution' in req.body) {
            ticket.expected_solution = req.body.expected_solution;
          }
          if (user) {
            ticket.user_ = user;
          }
          const resTicketSave = await this.ticketRepo.save(ticket);
          if ('user_' in resTicketSave && resTicketSave.user_) {
            delete resTicketSave.user_.created_at;
            delete resTicketSave.user_.updated_at;
          }
          return {
            info: `😅 Ticket API :: Tambah Baru 🤣`,
            result: resTicketSave
          };
        }
        throw new HttpException({
          info: `🙄 ${res_raw.status || 400} - Google API :: Captcha Bermasalah 😪`,
          result: {
            message: 'Captcha Salah / Expired / Google API Down!'
          }
        }, res_raw.status || HttpStatus.BAD_REQUEST);
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Ticket API :: Gagal Menambah Ticket Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const secretQuery = req.query['secret'] || '';
    try {
      const user: UserModel = res.locals['user'];
      const ticket = await this.ticketRepo.findOneOrFail({
        where: [
          { 
            id: Equal(parseInt(req.params['id'])),
            ...((user?.role === RoleModel.ADMIN || user?.role === RoleModel.MODERATOR) ? {
              // Admin, Moderator Can See All Reports
            } : {
              secret: Equal(secretQuery)
            })
          }
        ]
      });
      if (!ticket.url.startsWith('http')) {
        ticket.url = `http://${ticket.url}`;
      }
      if ('user_' in ticket && ticket.user_) {
        delete ticket.user_.created_at;
        delete ticket.user_.updated_at;
      }
      return {
        info: `😅 200 - Ticket API :: Detail ${req.params['id']} 🤣`,
        result: ticket
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Ticket API :: Gagal Mencari Ticket ${req.params['id']} 😪`,
        result: {
          message: 'Ticket Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('expected_solution' in req.body || 'final_decision' in req.body) {
        const ticket = await this.ticketRepo.findOneOrFail({
          where: [
            {
              id: Equal(parseInt(req.params['id'])),
              finished: false
            }
          ]
        });
        if ('expected_solution' in req.body) {
          ticket.expected_solution = req.body.expected_solution;
        }
        if ('final_decision' in req.body) {
          ticket.final_decision = req.body.final_decision;
          ticket.finished = true;
          this.ms.sendReportLaporanMail(ticket);
        }
        const resTicketSave = await this.ticketRepo.save(ticket);
        if ('user_' in resTicketSave && resTicketSave.user_) {
          delete resTicketSave.user_.created_at;
          delete resTicketSave.user_.updated_at;
        }
        return {
          info: `😅 201 - Ticket API :: Ubah ${req.params['id']} 🤣`,
          result: resTicketSave
        };
      } else {
        throw new HttpException({
          info: `🙄 400 - Fansub API :: Gagal Mengubah Ticket ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Ticket API :: Gagal Mencari Ticket ${req.params['id']} 😪`,
        result: {
          message: 'Ticket Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const ticket =  await this.ticketRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      const deletedTicket = await this.ticketRepo.remove(ticket);
      if ('user_' in deletedTicket && deletedTicket.user_) {
        delete deletedTicket.user_.created_at;
        delete deletedTicket.user_.updated_at;
      }
      return {
        info: `😅 202 - Ticket API :: Berhasil Menghapus Ticket ${req.params['id']} 🤣`,
        result: deletedTicket
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Ticket API :: Gagal Mencari Ticket ${req.params['id']} 😪`,
        result: {
          message: 'Ticket Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
