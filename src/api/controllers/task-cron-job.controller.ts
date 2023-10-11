// 3rd Party Library
import ClusterMessages from 'cluster-messages';

// NodeJS Library
import cluster from 'node:cluster';

import { Controller, Get, HttpCode, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { RoleModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { GlobalService } from '../services/global.service';
import { TaskCronJobService } from '../services/task-cron-job.service';

@ApiExcludeController()
@Controller('/task-cron-job')
export class TaskCronJobController {

  messages: ClusterMessages = new ClusterMessages();

  constructor(
    private gs: GlobalService,
    private tcjs: TaskCronJobService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      let jobs = [];
      if (cluster.isMaster) {
        jobs = this.tcjs.getAll();
      } else {
        try {
          jobs = await new Promise((resolve, reject) => {
            this.messages.send('CRON_GET', null, response => {
              if (response.error) {
                reject(response.error);
              } else {
                resolve(response.data);
              }
            });
          });
        } catch (err) {
          this.gs.log(`[MASTER_CRON_GET-ERROR]`, err, 'error');
        }
      }
      return {
        info: `😅 200 - Task API :: List All 🤣`,
        count: jobs.length,
        pages: 1,
        results: jobs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - CRON API :: Gagal Mendapatkan All Task Scheduler 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      let cronJob = null;
      if (cluster.isMaster) {
        cronJob = this.tcjs.getByIdKey(req.params['id']);
      } else {
        try {
          cronJob = await new Promise((resolve, reject) => {
            this.messages.send('CRON_PUT', req.params['id'], response => {
              if (response.error) {
                reject(response.error);
              } else {
                resolve(response.data);
              }
            });
          });
        } catch (err) {
          this.gs.log(`[MASTER_CRON_PUT-ERROR]`, err, 'error');
        }
      }
      return {
        info: `😅 201 - Task API :: Reload ${req.params['id']} 🤣`,
        result: cronJob
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Task API :: Gagal Mencari Cron Scheduler ${req.params['id']} 😪`,
        result: {
          message: 'Cron Scheduler Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
