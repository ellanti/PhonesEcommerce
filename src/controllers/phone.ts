import { Request, Response, NextFunction } from 'express'
import PhoneService from '../services/phone'
import PhoneModel, { PhoneDocument } from '../models/Phones'
import catchAsyncError from '../middlewares/catchAsyncErrors'
import { search, filter, productQueryParam } from '../helpers/apiFeatures'
import { findAll } from './movie'

//Create Product -Admin
export const createProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const phone = new PhoneModel(req.body)
    const product = await PhoneService.createPhone(phone as PhoneDocument)
    res.status(201).json({ success: true, product })
  }
)

// View products - Admin & User
export const getAllPhones = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryParam = req.query
    const searchQuery = search(queryParam as productQueryParam)
    const filterQuery = filter(queryParam as productQueryParam)
    const phones = await PhoneService.getAllPhones({
      ...searchQuery,
      ...filterQuery,
    })
    res.json({ success: true, phones })
  }
)

//view product - Admin & User
export const getPhone = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json(await PhoneService.getPhoneDetails(req.params.phoneId))
  }
)

//update Product - Admin
export const updateProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await PhoneService.updatePhone(req.params.phoneId, req.body)
    res.json(product)
  }
)

//Delet Product - Admin
export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await PhoneService.deletePhone(req.params.phoneId)
    res.json({ success: 'true', message: 'Delete successful', product })
  }
)
