import express from 'express'
import { isAuthenticatedUser } from '../middlewares/authenticated'
import {
  createUpdateReview,
  deleteReview,
  getProductReviews,
} from '../controllers/phoneController'

const router = express.Router()

router
  .put('/', isAuthenticatedUser, createUpdateReview)
  .delete('/', isAuthenticatedUser, deleteReview)
  .get('/:producId', getProductReviews)

export default router
