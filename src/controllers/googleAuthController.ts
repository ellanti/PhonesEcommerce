import { Request, Response } from 'express'
import Users, { UserDocument } from '../models/Users'
import UserService from '../services/userService'
import getJwtToken from '../helpers/getJwtToken'

const googleAuth = async (req: Request, res: Response) => {
  const userData = req.user as UserDocument
  const email = userData.email

  // Checking if the google user already exists
  if (email) {
    Users.findOne({ email }).exec(async (err, user) => {
      if (err) {
        res
          .status(400)
          .json({ error: 'Something went wrong with user authentication' })
      } else {
        let token
        if (!user) {
          // if user does not exists
          const newUserModel = new Users(userData)
          const newUser = await UserService.create(newUserModel)
          token = getJwtToken(newUser, res)
        } else {
          token = getJwtToken
          res.json({ userData, token })
        }
      }
    })
  }
}

export default googleAuth
