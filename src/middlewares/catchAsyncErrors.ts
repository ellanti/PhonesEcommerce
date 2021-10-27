import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'

type AsyncFuncType = (req: Request, res: Response, next: NextFunction) => void

const asyncErrorHandler =
  (asyncFunc: AsyncFuncType) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunc(req, res, next)).catch((error) => {
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', error))
      } else {
        next(error)
      }
    })
  }

export default asyncErrorHandler
