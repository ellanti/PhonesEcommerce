import { Request, Response, NextFunction } from 'express'

type AsyncFuncType = (req: Request, res: Response, next: NextFunction) => void

const asyncErrorHandler =
  (asyncFunc: AsyncFuncType) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunc(req, res, next)).catch((error) => {
      console.log(error), next(error)
    })
  }

export default asyncErrorHandler
