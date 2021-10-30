import express from 'express'
import { isAuthenticatedUser, isAuthorized } from '../middlewares/authenticated'

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateProfile,
} from '../controllers/userController'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router
  .post('/register', registerUser)
  .post('/login', loginUser)
  .post('/logout', logoutUser)
  .get('/me', isAuthenticatedUser, getUserDetails)
  .put('/password', isAuthenticatedUser, updatePassword)
  .put('/me', isAuthenticatedUser, updateProfile)

export default router
