import Orders, { OrderDocument } from '../models/Order'

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return Orders.create(order)
}

const findByUser = async (id: string): Promise<OrderDocument[]> => {
  return await Orders.find({ user: id })
}

const findOrderById = async (id: string): Promise<OrderDocument[]> => {
  return await Orders.find({ _id: id })
}

const deleteOrderById = async (id: string): Promise<OrderDocument | null> => {
  return await Orders.findByIdAndDelete(id)
}

const getAllOrders = async (): Promise<OrderDocument[]> => {
  return await Orders.find()
}

export default {
  createOrder,
  findByUser,
  findOrderById,
  deleteOrderById,
  getAllOrders,
}
