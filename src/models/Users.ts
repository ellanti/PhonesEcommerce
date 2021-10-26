import mongoose, { Document } from 'mongoose'
import AddressSchema, { Address } from './Address'
import { PhoneDocument } from './Phones'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: number
  address: Address[]
  orderHistory: PhoneDocument[]
}

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, index: true },
  password: { type: String },
  phoneNumber: { type: Number },
  address: { type: [AddressSchema] }, // address as embedded document
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phones' }],
})

export default mongoose.model<UserDocument>('User', UserSchema)
