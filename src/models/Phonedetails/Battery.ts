import mongoose, { Document } from 'mongoose'

export type Battery = Document & {
  capacity: string
}

const BatterySchema = new mongoose.Schema<Battery>({
  capacity: { type: String },
})

export default BatterySchema
