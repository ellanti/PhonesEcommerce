import mongoose, { Document } from 'mongoose'
import { PhoneDocument } from './Phones'

type Item = {
  product: PhoneDocument
  quantity: number
  price: number
}
export type OrderDocument = Document & {
  _id?: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  orderItems: Item[]
  totalPrice: number
  createdAt: Date
}

const OrderSchema = new mongoose.Schema<OrderDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phones',
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export default mongoose.model<OrderDocument>('Order', OrderSchema)
