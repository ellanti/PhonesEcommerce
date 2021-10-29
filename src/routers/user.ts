import express from 'express'
import { isAuthenticatedUser } from '../middlewares/authenticated'

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me', isAuthenticatedUser, getUserDetails)

export default router
