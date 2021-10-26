import { Request, Response, NextFunction } from 'express'
import PhoneService from '../services/phone'
import { BadRequestError } from '../helpers/apiError'
import Phones from '../models/Phones'

//Create Product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('BODY********:', req.body)
    //const product = await Phones.create(req.body)
    const product = await PhoneService.create(req.body)
    //console.log('Product******:', product)
    res.status(201).json({ success: true, product })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const getAllPhones = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Route is good' })
}
