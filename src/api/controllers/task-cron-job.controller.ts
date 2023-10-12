// NodeJS Library
import cluster from 'node:cluster';

import { Controller, Get, HttpCode, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { RoleModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { TaskCronJobService } from '../services/task-cron-job.service';
import { ClusterMasterSlaveService } from '../services/cluster-master-slave.service';

@ApiExcludeController()
@Controller('/task-cron-job')
export class TaskCronJobController {

  constructor(
    private tcjs: TaskCronJobService,
    private cms: ClusterMasterSlaveService
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
        jobs = await this.cms.sendMessageToMaster('CRON_GET', null);
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
        cronJob = await this.cms.sendMessageToMaster('CRON_PUT', req.params['id']);
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
