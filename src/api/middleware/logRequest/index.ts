import { NextFunction, Request, Response } from 'express';
import logger from '../../../services/logger';

const winston = logger(module);
// FIXME update log requests
const logRequest = (req: Request, _: Response, next: NextFunction): void => {
  /**
   *  format the different types of request
   * ie queries, params, users etc..
   */
  const { method, url } = req;
  winston.info(`Logging ${method} request for ${url}`);
  next();
};

export default logRequest;
