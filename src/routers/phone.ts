import express from 'express'
import {
  createProduct,
  getAllPhones,
  updateProduct,
  deleteProduct,
  getPhone,
} from '../controllers/phone'

const router = express.Router()
router.get('/', getAllPhones)
router.get('/phone/:phoneId', getPhone)
router.post('/', createProduct)
router.put('/:phoneId', updateProduct)
router.post('/:phoneId', deleteProduct)

export default router
