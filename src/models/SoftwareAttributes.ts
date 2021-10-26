import mongoose, { Document } from 'mongoose'

export type SoftwareAttributes = Document & {
  os: string
  RAM: string
  memory: string
}

const SoftwareAttrSchema = new mongoose.Schema<SoftwareAttributes>({
  os: { type: String },
  RAM: { type: String, required: true },
  memory: { type: String },
})

export default SoftwareAttrSchema
