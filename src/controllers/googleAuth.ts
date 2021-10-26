import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from '../util/secrets'
import jwt from 'jsonwebtoken'
import Users, { UserDocument } from '../models/Users'
import UserService from '../services/user'

const googleAuth = async (req: Request, res: Response) => {
  const userData = req.user as UserDocument
  const { firstName, lastName, email } = userData

  // Checking if the user already exists
  if (email) {
    Users.findOne({ email }).exec(async (err, user) => {
      if (err) {
        res
          .status(400)
          .json({ error: 'Something went wrong with user authentication' })
      } else {
        if (!user) {
          // if user does not exists
          const newUser = new Users({ firstName, lastName, email })
          await UserService.create(newUser)
          const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
            expiresIn: '2h',
          })
          res.json({ token, userData })
        } else {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '2h',
          })
          res.json({ token, userData })
        }
      }
    })
  }
}

export default googleAuth
