import express from 'express'
import { isAuthenticatedUser, isAuthorized } from '../middlewares/authenticated'
import {
  createProduct,
  getAllPhones,
  updateProduct,
  deleteProduct,
  getPhone,
} from '../controllers/phone'

const router = express.Router()
router.get('/', isAuthenticatedUser, isAuthorized('admin'), getAllPhones)
router.get('/phone/:phoneId', getPhone)
router.post('/', isAuthenticatedUser, createProduct)
router.put('/:phoneId', isAuthenticatedUser, updateProduct)
router.post('/:phoneId', isAuthenticatedUser, deleteProduct)

export default router
