import mongoose, { Document } from 'mongoose'

export type PhysicalAttributes = Document & {
  resolution: string
  dimensions: string
  color: string
}

const PhysicalAttrSchema = new mongoose.Schema<PhysicalAttributes>({
  resolution: { type: String },
  dimensions: { type: String, required: true },
  color: { type: String },
})

export default PhysicalAttrSchema
