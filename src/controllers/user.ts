import { Request, Response, NextFunction } from 'express'

import UserModel from '../models/Users'
import UserService from '../services/user'
import catchAsyncError from '../middlewares/catchAsyncErrors'

// GET /movies
export const findAll = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await UserService.findAll())
  }
)

// POST /movies
export const create = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phoneNumber, address } = req.body
    const user = new UserModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    })
    await UserService.create(user)
    res.json(user)
  }
)

// GET /users/:userId
export const findById = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await UserService.findById(req.params.movieId))
  }
)

// PUT /users/:userId
export const updateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  }
)

// DELETE /users/:userId
export const deleteUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    await UserService.deleteUser(req.params.userId)
    res.status(204).end()
  }
)
