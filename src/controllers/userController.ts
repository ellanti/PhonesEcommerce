import { Request, Response, NextFunction } from 'express'

import UserModel, { UserDocument } from '../models/Users'
import UserService from '../services/userService'
import {
  BadRequestError,
  UnauthorizedError,
} from '../middlewares/apiErrorHandler'
import getJwtToken from '../helpers/getJwtToken'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// GET /users
export const getAllUsers = catchAsyncErrors(
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
    // explicitly mention to fetch password into user Document
    const user = await UserService.findByEmail(email, true)
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
    const user = req.user
    res.json({ success: true, user })
  }
)
export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userDoc = req.user as UserDocument
    const user = await UserService.findById(userDoc._id, true)
    const passwordMatch = await user.comparePassword(req.body.oldPassword)
    if (!passwordMatch) {
      return next(new UnauthorizedError('Password incorrect'))
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new UnauthorizedError('Passwords do not match'))
    }
    user.password = req.body.newPassword
    await user.save()
    getJwtToken(user, res)
  }
)

export const updateProfile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const userDoc = req.user as UserDocument
    const { phoneNumber, address } = req.body
    const user = await UserService.update(userDoc._id, { phoneNumber, address })
    res.json({ success: true, user })
  }
)
