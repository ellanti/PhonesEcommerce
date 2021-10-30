import { Request, Response, NextFunction } from 'express'
import UserService from '../services/userService'
import { BadRequestError, NotFoundError } from '../middlewares/apiErrorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'

// GET /users
export const getAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await UserService.findAll())
  }
)

//PUT update Role
export const updateUserRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, role } = req.body
    if (!role) {
      return next(new BadRequestError('Role cannot be null'))
    }
    const userToUpdate = await UserService.findByEmail(email)
    const user = !userToUpdate
      ? next(new NotFoundError('User Not Found'))
      : await UserService.update(userToUpdate._id, { role })
    res.json({ success: true, user })
  }
)

// DELETE delete profile
export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query
    const userToDelete = await UserService.findByEmail(email as string)
    if (!userToDelete) {
      return next(new NotFoundError('User Not Found'))
    } else {
      const user = await UserService.deleteUser(userToDelete._id)
      res.json({ success: true, user })
    }
    // const user = !userToDelete
    //   ? next(new NotFoundError('User Not Found'))
    //   : await UserService.deleteUser(userToDelete._id)
    // res.json({ success: true, user })
  }
)
