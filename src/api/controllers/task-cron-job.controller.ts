import { Controller, Get, HttpCode, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Request, Response } from 'express';

import { RoleModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

import { ConfigService } from '../services/config.service';

@Controller('/task-cron-job')
export class TaskCronJobController {

  constructor(
    private sr: SchedulerRegistry,
    private cfg: ConfigService,
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
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
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const cronJob = this.sr.getCronJob(req.params['id']);
      if (cronJob) {
        if (cronJob.running) {
          cronJob.stop();
          this.cfg.CRON[req.params['id']] = false;
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
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
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
