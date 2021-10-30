import express from 'express'
import { isAuthenticatedUser, isAuthorized } from '../middlewares/authenticated'

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController'

const router = express.Router()

router
  .get('/users', isAuthenticatedUser, isAuthorized('admin'), getAllUsers)
  .put('/user', isAuthenticatedUser, isAuthorized('admin'), updateUserRole)
  .delete('/user', isAuthenticatedUser, isAuthorized('admin'), deleteUser)

export default router
