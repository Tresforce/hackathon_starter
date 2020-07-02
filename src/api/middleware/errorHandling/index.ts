import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import { ValidateError } from 'tsoa';
import logger from '../../../utils/logger';
import DetailedError from '../../../utils/DetailedError';

const winston = logger(module);

/**
 *
 *
 * @export
 * @param {Request} req
 * @param {Response} _
 * @param {NextFunction} next
 */
export function notFoundError(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  const error = new DetailedError({
    name: 'NotFoundError',
    message: 'Not Found',
    statusCode: NOT_FOUND,
    contextObject: {
      path: req.url
    }
  });
  next(error);
}

/**
 *
 *
 * @export
 * @param {DetailedError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} [next]
 * @returns {Response}
 */
export function sendError(
  err: DetailedError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next?: NextFunction
): Response {
  let validateError: DetailedError | undefined;
  if (err instanceof ValidateError) {
    winston.warn(
      `Caught Validation Error for ${req.path}:${JSON.stringify(
        err.fields,
        null,
        2
      )}`
    );
    validateError = new DetailedError({
      name: 'Validation Error',
      message: 'Validation failed',
      statusCode: UNPROCESSABLE_ENTITY,
      contextObject: {
        fields: err.fields
      }
    });
  }
  const responseError = validateError ?? err;
  winston.debug(responseError.stack);
  res.status(responseError.status);
  return res.json({
    error: {
      message: responseError.message,
      ...responseError.contextObject
    }
  });
}
