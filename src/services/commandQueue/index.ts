import Queue from 'bull';
import Redis from 'ioredis';
import logger from '../logger';

import { CommandFunction } from '../../typings/message';

const commandStackQueue = 'write-queue';
const winston = logger(module);

function createClient(): Redis.Redis {
  return new Redis('redis://redis:6379');
}

export default class CommandQueue {
  private queue = new Queue(commandStackQueue, { createClient });

  public async processEvent(
    event: Record<any, any>,
    handler: CommandFunction
  ): Promise<any> {
    winston.info('adding job to queue');
    await this.queue.add(event);

    // eslint-disable-next-line @typescript-eslint/require-await
    void this.queue.process(async job => {
      winston.debug(job.data);
      return handler(job.data);
    });

    this.queue.on('completed', (job, result) => {
      winston.info(`Job completed with result: ${result}`);
    });

    this.queue.on('failed', (job, result) => {
      winston.error(`Job failed: ${result}`);
    });
  }
}
