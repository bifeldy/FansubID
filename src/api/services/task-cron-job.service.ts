import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TaskCronJobService {

  constructor(
    private sr: SchedulerRegistry
  ) {
    //
  }

  getAll(): any[] {
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
    return jobs;
  }

  getByIdKey(key: string): any {
    const cronJob: CronJob = this.sr.getCronJob(key);
    if (cronJob) {
      if (cronJob.running) {
        cronJob.stop();
      } else {
        cronJob.start();
      }
      return {
        id: key,
        last_date: cronJob.lastDate(),
        next_date: cronJob.nextDate().toJSDate(),
        running: cronJob.running
      };
    }
    throw new Error('Cron Scheduler Tidak Ditemukan!');
  }

}
