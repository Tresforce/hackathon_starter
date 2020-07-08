import { Express } from 'express';

import logger from '../services/logger';
import store, { EventLog } from './database/ravendb';
import expressLoader from './server';
import '../services/commandQueue';

const winston = logger(module);

export default async ({ app }: { app: Express }): Promise<void> => {
  try {
    await new EventLog(store).establishDatabaseConnection();
    winston.info('database connection established...');
    winston.info('Connecting to express...');
    expressLoader({ app });
    winston.info('express connected...');
  } catch (error) {
    winston.error(`Problem loading database: ${error}`);
    process.exit(1);
  }
};
