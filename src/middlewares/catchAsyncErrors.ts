import { Request, Response, NextFunction } from 'express'

type AsyncFuncType = (req: Request, res: Response, next: NextFunction) => void

const catchAsyncErrors =
  (asyncFunc: AsyncFuncType) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunc(req, res, next)).catch((error) => {
      if (error.code === 11000) {
        error.name = 'MONGO_DUPLICATE'
      }
      next(error)
    })
  }

export default catchAsyncErrors
