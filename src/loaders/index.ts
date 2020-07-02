import { Express } from 'express';
import logger from '../utils/logger';
import Database from './database/postgres';
import expressLoader from './server';
import config from '../config';
// import addJobs from '../services/ErrorQueue';

const winston = logger(module);

export default async ({ app }: { app: Express }): Promise<void> => {
  try {
    winston.info('Connecting to database...');
    await new Database().getDbConnection(config.TYPEORM_DATABASE);
    winston.info('database connection established...');
    // await addJobs();
    winston.info('Connecting to express...');
    expressLoader({ app });
    winston.info('express connected...');
  } catch (error) {
    winston.error(`Problem loading database: ${error}`);
    process.exit(1);
  }
};
