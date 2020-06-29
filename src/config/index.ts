import { logger } from '../utils';
import application from './application';
import database from './database';

const winston = logger(module);

const config = {
  ...application,
  ...database
};

winston.info('checking environment variables...');

Object.entries(config).forEach(environmentVariable => {
  const [key, value] = environmentVariable;
  if (value === undefined || value === '' || value === null) {
    const missingVariable = `Environment variable ${key} must be defined!`;
    winston.error(missingVariable);
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
  }
});

export default { application, database };
