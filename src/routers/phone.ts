import express from 'express'
import { createProduct, getAllPhones } from '../controllers/phone'

const router = express.Router()
router.get('/', getAllPhones)
router.post('/', createProduct)

export default router
