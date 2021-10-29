import { Request, Response, NextFunction } from 'express'

import ApiError from '../helpers/apiError'
import logger from '../util/logger'

export class NotFoundError extends ApiError {
  constructor(readonly message: string = 'Not Found', source?: Error | any) {
    super(404, message, source)
  }
}

export class ForbiddenError extends ApiError {
  constructor(readonly message: string = 'Forbidden', source?: Error | any) {
    super(403, message, source)
  }
}

export class InternalServerError extends ApiError {
  constructor(
    readonly message: string = 'Internal Server Error',
    source?: Error | any
  ) {
    super(500, message, source)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    readonly message: string = 'Unauthorized Request',
    source?: Error | any
  ) {
    super(401, message, source)
  }
}

export class BadRequestError extends ApiError {
  constructor(readonly message: string = 'Bad Request', source?: Error | any) {
    super(400, message, source)
  }
}

export default function (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.source) {
    logger.error(error.source)
  }

  if (error.name === 'ValidationError') {
    error = new BadRequestError('Invalid Request', error)
  }

  // Mongoose duplicate key error
  if (error.name === 'MONGO_DUPLICATE') {
    error = new BadRequestError('User Already exists', error)
  }

  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError'
  ) {
    error = new BadRequestError('Token Invalid', error)
  }

  res.status(error.statusCode).json({
    success: false,
    status: error.statusCode,
    message: error.message,
  })
}
