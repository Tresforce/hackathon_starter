import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils';

const winston = logger(module);
// FIXME update log requests
const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  /**
   *  format the different types of request
   * ie queries, params, users etc..
   */
  const { method, url } = req;
  winston.info(`Logging ${method} request for ${url.split('dev')[1]}`);
  next();
};

export default logRequest;
