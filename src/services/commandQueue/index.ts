import Queue from 'bull';
import Redis from 'ioredis';
import { setQueues } from 'bull-board';
// import logger from '../logger';

function createClient(): Redis.Redis {
  return new Redis('redis://redis:6379');
}
const commandStackQueue = 'write-queue';
const cQueue = new Queue(commandStackQueue, { createClient });
// const winston = logger(module);

setQueues(cQueue);

// cQueue.process(async job => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(console.log(job.data));
//     }, 5000);
//   });
// });

cQueue
  .on('ready', () => {
    // Redis is connected and the queue is ready to accept jobs.
    console.log(`The job  is ready for processing!`);
  })

  .on('error', error => {
    /* eslint handle-callback-err: 0 */
    // An error occured.
    console.log(error);
  })

  .on('active', (job, jobPromise) => {
    // A job has started. You can use `jobPromise.cancel()`` to abort it.
    console.log('active');
  })

  .on('stalled', job => {
    // A job has been marked as stalled. This is useful for debugging job
    // workers that crash or pause the event loop.
    console.log('stalled');
  })

  .on('progress', (job, progress) => {
    // A job's progress was updated!
    console.log('progress', progress);
  })

  .on('completed', (job, result) => {
    // A job successfully completed with a `result`.
    console.log('completed');
  })

  .on('failed', (job, err) => {
    // A job failed with reason `err`!
    console.log('failed');
  })

  .on('paused', () => {
    // The queue has been paused.
  })

  .on('resumed', job => {
    // The queue has been resumed.
  })

  .on('cleaned', (jobs, type) => {
    // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
    // jobs, and `type` is the type of jobs cleaned.
  });

export default cQueue;
