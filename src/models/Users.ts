import mongoose, { Document } from 'mongoose'
import AddressSchema, { Address } from './Address'
import { PhoneDocument } from './Phones'
import { JWT_SECRET, JWT_EXPIRE } from '../util/secrets'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export type UserAttributes = {
  firstName: string
  lastName: string
  email: string
  role: string
  password: string
  phoneNumber: number
  address: Address[]
  orderHistory: PhoneDocument[]
}

export type UserDocument = UserAttributes &
  Document & {
    comparePassword: (password: string) => Promise<boolean>
    jwtToken: () => string
  }

const UserSchema = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
    maxLength: [20, 'Name Cannot be more than 50 characters'],
    minLength: [2, 'Min length should be 2 characters'],
  },
  lastName: {
    type: String,
    required: true,
    maxLength: [20, 'Name Cannot be more than 50 characters'],
    minLength: [2, 'Min length should be 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Min password length should be 8 characters'],
    select: false, // fetching the document should skip password
  },
  role: { type: String, default: 'user' },
  phoneNumber: { type: Number },
  address: { type: [AddressSchema] }, // address as embedded document
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phones' }],
})

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  } else {
    next()
  }
})

UserSchema.methods.jwtToken = function () {
  return jwt.sign({ _id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  })
}

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default mongoose.model<UserDocument>('User', UserSchema)
