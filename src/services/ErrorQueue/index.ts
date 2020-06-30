import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../../utils/logger';

const connection = new IORedis({ host: 'redis', port: 6379 });
const queueName = 'ErrorQue';
const winston = logger(module);

const myQueue = new Queue(queueName, { connection });
const worker = new Worker(
  queueName,
  async job => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    await Promise.resolve();
    winston.info(job.data);
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

export default async function addJobs(): Promise<void> {
  await myQueue.add('myJobName', { foo: 'bar' });
}
