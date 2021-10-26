import express from 'express'

import {
  create,
  findAll,
  // findById,
  // delete,
  // update,
} from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/', findAll)
//router.get('/:userId', findById)
//router.put('/:userId', update)
//router.delete('/:userId', delete)
router.post('/', create)

export default router
