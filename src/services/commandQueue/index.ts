import Queue from 'bull';
import Redis from 'ioredis';
import logger from '../logger';
import AccountService from '../../models/account/commands/createAccount';

export const commandStackQueue = 'write-que';
const winston = logger(module);

function createClient(): Redis.Redis {
  return new Redis('redis://redis:6379');
}

const commandQueue = new Queue(commandStackQueue, { createClient });
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

void commandQueue.process(async job => {
  winston.debug(job.data);
  return AccountService.handle(job.data);
});

// Define a local completed event
commandQueue.on('completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
});

commandQueue.on('failed', (job, result) => {
  console.log(`Job failed with result ${result}`);
});

export default async function addJob(event: Record<any, any>): Promise<any> {
  winston.info('adding job to queue');
  return commandQueue.add(event);
}
