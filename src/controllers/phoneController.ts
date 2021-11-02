import { Request, Response, NextFunction } from 'express'
import PhoneService from '../services/phoneService'
import PhoneModel, { PhoneDocument } from '../models/Phones'
import catchAsyncError from '../middlewares/catchAsyncErrors'
import { search, filter, ProductQueryParam } from '../helpers/apiFeatures'
import { UserDocument } from '../models/Users'
import { NotFoundError } from '../middlewares/apiErrorHandler'

//Create Product -Admin
export const createProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const phone = new PhoneModel(req.body)
    const product = await PhoneService.createPhone(phone as PhoneDocument)
    res.status(201).json({ success: true, product })
  }
)

// View products - Admin & User
export const getAllProducts = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryParam = req.query
    const searchQuery = search(queryParam as ProductQueryParam)
    const filterQuery = filter(queryParam as ProductQueryParam)
    const currentPage = (queryParam as ProductQueryParam).page as number | 1
    const productsPerPage = 3
    const skip = (currentPage - 1) * productsPerPage
    const phones = await PhoneService.getAllPhones(
      { ...searchQuery, ...filterQuery },
      productsPerPage,
      skip
    )
    const productsCount = phones.length
    res.json({ phones, productsPerPage, productsCount })
  }
)

//view product - Admin & User
export const getProduct = catchAsyncError(
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

//Delete Product - Admin
export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await PhoneService.deletePhone(req.params.phoneId)
    res.json({ success: 'true', message: 'Delete successful', product })
  }
)

//create review - User
export const createUpdateReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument
    const { rating, comment, productId } = req.body

    const review = { user: user._id, name: user.firstName, rating, comment }
    const product = await PhoneService.getPhoneDetails(productId)
    if (!product) {
      next(new NotFoundError('Product Not Found'))
    }

    console.log('UserId:', user._id)
    const existingReview = product.reviews?.find((review) => {
      if (review.user.toString() === user._id.toString()) {
        return review
      }
    })

    if (existingReview) {
      //update the existing review
      product.reviews?.forEach((review) => {
        if (review.user.toString() === user._id.toString()) {
          review.rating = rating
          review.comment = comment
        }
      })
    } else {
      // add new review
      product.reviews?.push(review)
      product.noReviews = product.reviews?.length
    }
    let avgRating = 0
    product.reviews?.forEach((rev) => (avgRating += rev.rating))
    if (product.noReviews) {
      product.ratings = avgRating / product.noReviews
    }
    await product.save()
    res.json({ success: true })
  }
)

// delete review - Admin
export const deleteReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, reviewId } = req.query

    const product = await PhoneService.getPhoneDetails(productId as string)
    if (!product) {
      return next(new NotFoundError('Product Not Found'))
    } else {
      const reviews = product.reviews?.filter(
        (review) => review._id?.toString() !== reviewId?.toString()
      )
      if (reviews?.length === product.noReviews) {
        return next(new NotFoundError('Review not found'))
      } else {
        product.reviews = reviews
        product.noReviews = reviews?.length
        if (product.noReviews) {
          let avgRating = 0
          reviews?.forEach((rev) => (avgRating += rev.rating))
          product.ratings = avgRating / product.noReviews
        } else {
          product.ratings = 0
        }
        await product.save()
        res.json({ success: true, message: 'Review delete success' })
      }
    }
  }
)

// get all reviews
export const getProductReviews = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.producId
    const product = await PhoneService.getPhoneDetails(productId)
    if (!product) {
      return next(new NotFoundError('Product Not Found'))
    } else if (product.noReviews === 0) {
      return next(new NotFoundError('No Reviews yet'))
    } else {
      const reviews = product.reviews
      res.json({ success: true, reviews })
    }
  }
)
