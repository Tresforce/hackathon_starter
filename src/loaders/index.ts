import { Application } from 'express';
import { logger } from '../utils';
import Database from './database/postgres';
import expressLoader from './express';

const winston = logger(module);

export default async ({
  expressApp
}: {
  expressApp: Application;
}): Promise<void> => {
  try {
    winston.info('Connecting to database...');
    await new Database().getDbConnection({});
    winston.info('database connection established...');

    winston.info('Connecting to express...');
    expressLoader({ app: expressApp });
    winston.info('express connected...');
  } catch (error) {
    winston.error(`Problem loading database: ${error}`);
    process.exit(1);
  }
};
