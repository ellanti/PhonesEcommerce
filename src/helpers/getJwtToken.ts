import { UserDocument } from '../models/Users'
import { Response } from 'express'
import { COOKIE_EXPIRE } from '../util/secrets'

export const getJwtToken = (user: UserDocument, res: Response) => {
  const token = user.jwtToken()
  const cookieOptions = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 60 * 60 * 1000),
    httpOnly: true,
  }

  res.cookie('token', token, cookieOptions).json({
    user,
    token,
  })
}

export default getJwtToken
