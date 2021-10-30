import mongoose, { Document } from 'mongoose'

export type Camera = Document & {
  PrimCamPixels: string
  SecCamPixels: string
}

const CamSchema = new mongoose.Schema<Camera>({
  PrimCamPixels: { type: String },
  SecCamPixels: { type: String },
})

export default CamSchema
