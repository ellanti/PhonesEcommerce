import express from 'express'
import passport from 'passport'
import googleAuth from '../controllers/googleAuthController'

const router = express.Router()

router.post(
  '/',
  passport.authenticate('google-id-token', { session: false }),
  googleAuth
)

export default router
