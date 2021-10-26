import mongoose, { Document } from 'mongoose'
import BatterySchema, { Battery } from './Battery'
import CamSchema, { Camera } from './Camera'
import PhysicalAttrSchema, { PhysicalAttributes } from './PhysicalAttributes'
import SimSchema, { Sim } from './Sim'
import SoftwareAttrSchema, { SoftwareAttributes } from './SoftwareAttributes'

export type Variants = Document & {
  physicalAttributes: PhysicalAttributes
  sofwareAttributes: SoftwareAttributes
  camera: Camera
  battery: Battery
  sim: Sim
}

const VariantsSchema = new mongoose.Schema<Variants>({
  physicalAttributes: { type: PhysicalAttrSchema },
  softwareAttributes: { type: SoftwareAttrSchema },
  camera: { type: CamSchema },
  battery: { type: BatterySchema },
  sim: { type: SimSchema },
})

export default mongoose.model('Variants', VariantsSchema)
