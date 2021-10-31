import { NextFunction, Request, Response } from 'express'
import { UserDocument } from '../models/Users'
import OrderModel from '../models/Order'
import catchAsyncErrors from '../middlewares/catchAsyncErrors'
import OrderService from '../services/orderService'
import { NotFoundError } from '../middlewares/apiErrorHandler'

export const newOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderItems, totalPrice } = req.body
    const user = req.user as UserDocument
    const createdAt = Date.now()
    const order = new OrderModel({ user, orderItems, totalPrice, createdAt })
    const newOrder = await OrderService.createOrder(order)
    res.json({ success: true, newOrder })
  }
)

export const getUserOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserDocument
    const orders = await OrderService.findByUser(user._id)
    if (!orders) {
      return next(new NotFoundError('No orders found'))
    } else {
      res.json({ success: true, orders })
    }
  }
)

export const getSingleOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await OrderService.findOrderById(req.params.id)
    if (!order) {
      return next(new NotFoundError('Order does not exist'))
    } else {
      res.json({ success: true, order })
    }
  }
)

export const getAllOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await OrderService.getAllOrders()
    res.json({ success: true, orders })
  }
)

export const deleteOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await OrderService.deleteOrderById(req.params.id)
    !order
      ? next(new NotFoundError('Order not found'))
      : res.json({ success: true, message: 'delete successful' })
  }
)
