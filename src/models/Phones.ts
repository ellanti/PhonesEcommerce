import mongoose, { Document } from 'mongoose'
import { Variants } from './Variants'

type reviewType = {
  name: string
  rating: number
  comment: string
}
export type PhoneDocument = Document & {
  model: string
  brand?: string
  price: number
  variants?: Variants[]
  ratings?: number
  images: string[]
  stock: number
  noReviews?: number
  reviews?: reviewType[]
}

const PhonesSchema = new mongoose.Schema<PhoneDocument>({
  model: {
    type: String,
    required: [true, 'Please enter model name'],
    unique: true,
  },
  brand: { type: String },
  price: {
    type: Number,
    required: [true, 'Please enter Price'],
    maxLength: [5, 'Price cannot exceed 99999'],
  },
  variants: { type: mongoose.Schema.Types.ObjectId, ref: 'Variants' },
  ratings: { type: Number, default: 0 },
  images: [{ type: String, required: [true, 'Please upload an image'] }],
  stock: {
    type: Number,
    required: [true, 'Please enter Product stock'],
    maxLength: 10,
    default: 1,
  },
  noReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
})

export default mongoose.model<PhoneDocument>('Phone', PhonesSchema)
