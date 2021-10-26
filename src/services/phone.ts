import PhoneModel, { PhoneDocument } from '../models/Phones'
import { NotFoundError } from '../helpers/apiError'

type PhoneResDoc = PhoneDocument & { _id: string; __v: number }

const create = async (phone: PhoneDocument): Promise<PhoneResDoc> => {
  console.log('Trying to save to PhoneCollection')
  console.log('PhoneDocument***********:', phone)
  const product: PhoneResDoc = await PhoneModel.create(phone)
  console.log(product)
  return product
  //return phone.save()
}

export default { create }
