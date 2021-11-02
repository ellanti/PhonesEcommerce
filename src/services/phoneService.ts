import Phones, { PhoneDocument } from '../models/Phones'
import { NotFoundError } from '../middlewares/apiErrorHandler'
import { isInteger } from 'lodash'

const createPhone = async (phone: PhoneDocument): Promise<PhoneDocument> => {
  return phone.save()
}

const updatePhone = async (
  phoneId: string,
  update: Partial<PhoneDocument>
): Promise<PhoneDocument> => {
  try {
    const foundPhone = await Phones.findByIdAndUpdate(phoneId, update, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    })
    return foundPhone as PhoneDocument
  } catch (error) {
    throw new NotFoundError(`Phone  with Id ${phoneId} not found`)
  }
}

const deletePhone = async (phoneId: string): Promise<PhoneDocument> => {
  try {
    const deletedPhone = await Phones.findByIdAndDelete(phoneId)
    return deletedPhone as PhoneDocument
  } catch (error) {
    throw new NotFoundError(`Phone with Id ${phoneId} not found`)
  }
}

const getAllPhones = async (
  queryString: Record<string, any>,
  limit?: number,
  skip?: number
): Promise<PhoneDocument[]> => {
  const phones =
    limit !== undefined && skip !== undefined
      ? await Phones.find(queryString).limit(limit).skip(skip)
      : await Phones.find(queryString)
  return phones as PhoneDocument[]
}

const getPhoneDetails = async (phoneId: string): Promise<PhoneDocument> => {
  try {
    const phone = await Phones.findById(phoneId)
    return phone as PhoneDocument
  } catch (error) {
    throw new NotFoundError(`Phone with Id ${phoneId} not found`)
  }
}
export default {
  createPhone,
  updatePhone,
  deletePhone,
  getAllPhones,
  getPhoneDetails,
}
