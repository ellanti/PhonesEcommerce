import mongoose, { Document } from 'mongoose'

export type Sim = Document & {
  type: string
  cardFormat: string
}

const SimSchema = new mongoose.Schema<Sim>({
  type: { type: String },
  cardFormat: { type: String, required: true },
})

export default SimSchema
