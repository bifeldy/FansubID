import { Controller, Get, HttpCode, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { RoleModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

@ApiExcludeController()
@Controller('/task-cron-job')
export class TaskCronJobController {

  constructor(
    private sr: SchedulerRegistry
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const cronJobs = this.sr.getCronJobs();
    const jobs = [];
    for (const [key, value] of cronJobs) {
      jobs.push({
        id: key,
        last_date: value.lastDate(),
        next_date: value.nextDate().toJSDate(),
        running: value.running
      });
    }
    return {
      info: `😅 200 - Task API :: List All 🤣`,
      count: jobs.length,
      pages: 1,
      results: jobs
    };
  }

  @Put('/:id')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @FilterApiKeyAccess()
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const cronJob = this.sr.getCronJob(req.params['id']);
      if (cronJob) {
        if (cronJob.running) {
          cronJob.stop();
        } else {
          cronJob.start();
        }
        return {
          info: `😅 201 - Task API :: Reload ${req.params['id']} 🤣`,
          result: {
            id: req.params['id'],
            last_date: cronJob.lastDate(),
            next_date: cronJob.nextDate(),
            running: cronJob.running
          }
        };
      }
      throw new Error('Data Tidak Lengkap!');
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
