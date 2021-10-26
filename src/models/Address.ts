import mongoose, { Document } from 'mongoose'

export type Address = Document & {
  houseNo: string
  streetName: string
  landmark: string
  city: string
  country: string
  postalcode: number
}

const AddressSchema = new mongoose.Schema({
  houseNo: { type: String, required: true },
  streetName: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalcode: {
    type: Number,
    required: true,
  },
})

export default AddressSchema
