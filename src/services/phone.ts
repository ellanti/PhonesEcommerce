import PhoneModel, { PhoneDocument } from '../models/Phones'
import { NotFoundError } from '../helpers/apiError'

const create = (phone: PhoneDocument): Promise<PhoneDocument> => {
  return phone.save()
}

export default { create }
