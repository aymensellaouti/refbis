import { Injectable, Logger } from "@nestjs/common";
import { CronJob } from "cron";
import { SchedulerRegistry } from "@nestjs/schedule";

@Injectable()
export class CronService {
  private logger = new Logger(CronService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {
  }
  addCronJob(name: string, seconds: string, cb) {
    const job = new CronJob(`${seconds} * * * * *`, cb);

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }
}
