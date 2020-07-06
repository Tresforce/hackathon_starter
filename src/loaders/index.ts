import { Express } from 'express';
import logger from '../services/logger';

import expressLoader from './server';

const winston = logger(module);

export default async ({ app }: { app: Express }): Promise<void> => {
  try {
    winston.info('Connecting to database...');
    // eslint-disable-next-line global-require
    await require('../database/eventLog');
    winston.info('database connection established...');

    winston.info('Connecting to express...');
    expressLoader({ app });
    winston.info('express connected...');
  } catch (error) {
    winston.error(`Problem loading database: ${error}`);
    process.exit(1);
  }
};
