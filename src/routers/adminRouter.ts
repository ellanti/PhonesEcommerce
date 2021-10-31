import express from 'express'
import { isAuthenticatedUser, isAuthorized } from '../middlewares/authenticated'

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController'

import { getAllOrders, deleteOrder } from '../controllers/orderController'

const router = express.Router()

router
  .get('/users', isAuthenticatedUser, isAuthorized('admin'), getAllUsers)
  .put('/user', isAuthenticatedUser, isAuthorized('admin'), updateUserRole)
  .delete('/user', isAuthenticatedUser, isAuthorized('admin'), deleteUser)
  .get('/orders', isAuthenticatedUser, isAuthorized('admin'), getAllOrders)
  .delete('/order/:id', isAuthenticatedUser, isAuthorized('admin'), deleteOrder)

export default router
