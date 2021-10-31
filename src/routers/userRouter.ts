import express from 'express'
import { isAuthenticatedUser } from '../middlewares/authenticated'

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateProfile,
} from '../controllers/userController'

import {
  newOrder,
  getUserOrders,
  getSingleOrder,
} from '../controllers/orderController'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router
  .post('/register', registerUser)
  .post('/login', loginUser)
  .post('/logout', logoutUser)
  .get('/me', isAuthenticatedUser, getUserDetails)
  .put('/password', isAuthenticatedUser, updatePassword)
  .put('/me', isAuthenticatedUser, updateProfile)
  .post('/order', isAuthenticatedUser, newOrder)
  .get('/orders/me', isAuthenticatedUser, getUserOrders)
  .get('/order/:id', isAuthenticatedUser, getSingleOrder)

export default router
