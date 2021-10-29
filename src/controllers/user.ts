import { Request, Response, NextFunction } from 'express'

import UserModel, { UserDocument } from '../models/Users'
import UserService from '../services/user'
import {
  BadRequestError,
  UnauthorizedError,
} from '../middlewares/apiErrorHandler'
import getJwtToken from '../helpers/getJwtToken'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// GET /users
export const findAll = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await UserService.findAll())
  }
)

// POST /users
export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body
    const user = new UserModel({
      firstName,
      lastName,
      email,
      password,
    })
    const newUser = await UserService.create(user)
    getJwtToken(newUser, res)
  }
)

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    if (!email || !password) {
      return next(new BadRequestError('Please Enter Email or Password'))
    }
    const user = await UserService.findByEmail(email)
    if (!user) {
      return next(new UnauthorizedError('Invalid Email or Password'))
    }
    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
      return next(new UnauthorizedError('Invalid Email or Password'))
    }

    getJwtToken(user, res)
  }
)

export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .cookie('token', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: 'true', message: 'Logged out' })
  }
)

export const getUserDetails = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument
    res.json({ success: true, user })
  }
)
