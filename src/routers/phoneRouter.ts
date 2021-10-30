import express from 'express'
import { isAuthenticatedUser, isAuthorized } from '../middlewares/authenticated'
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProduct,
} from '../controllers/phoneController'

const router = express.Router()
router
  .get('/', isAuthenticatedUser, isAuthorized('admin'), getAllProducts)
  .get('/phone/:phoneId', getProduct)
  .post('/', isAuthenticatedUser, createProduct)
  .put('/:phoneId', isAuthenticatedUser, updateProduct)
  .post('/:phoneId', isAuthenticatedUser, deleteProduct)

export default router
