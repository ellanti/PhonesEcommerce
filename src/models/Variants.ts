import mongoose, { Document } from 'mongoose'
import BatterySchema, { Battery } from './Phonedetails/Battery'
import CamSchema, { Camera } from './Phonedetails/Camera'
import PhysicalAttrSchema, {
  PhysicalAttributes,
} from './Phonedetails/PhysicalAttributes'
import SimSchema, { Sim } from './Phonedetails/Sim'
import SoftwareAttrSchema, {
  SoftwareAttributes,
} from './Phonedetails/SoftwareAttributes'

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
