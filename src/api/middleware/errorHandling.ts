import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils';
import DetailedError from '../../utils/DetailedError';

const winston = logger(module);

/**
 * Creates a 404 error when route is not found
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function notFoundError(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  winston.warn(req);
  const error = new DetailedError({
    name: 'NotFoundError',
    message: 'Not Found',
    statusCode: 404,
    contextObject: {}
  });
  next(error);
}

/**
 * Logs Error and sends to client
 *
 * @export
 * @param {DetailedError} err the thrown error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export function sendError(
  err: DetailedError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response {
  winston.error(err);
  res.status(err.status);
  return res.json({
    errors: {
      message: err.message
    }
  });
}
