import { Request, Response, NextFunction } from 'express'
import { ForbiddenError, UnauthorizedError } from './apiErrorHandler'
import catchAsyncError from './catchAsyncErrors'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'
import { UserDocument } from '../models/Users'

export const isAuthenticatedUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
    console.log('Token:', token)
    if (!token) {
      return next(new UnauthorizedError('Please login'))
    }
    const decodedData = verify(token, JWT_SECRET) as { _id: string }
    req.user = await UserService.findById(decodedData._id)
    next()
  }
)

export const isAuthorized =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as UserDocument
    if (!roles.includes(role)) {
      return next(new ForbiddenError('Forbidden for this Action'))
    }
    next()
  }
