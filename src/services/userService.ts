import Users, { UserDocument } from '../models/Users'
import { NotFoundError } from '../middlewares/apiErrorHandler'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return Users.create(user)
}

const findAll = async (): Promise<UserDocument[]> => {
  return Users.find().sort({ name: 1 })
}

const findByEmail = async (
  email: string,
  password?: boolean
): Promise<UserDocument | null> => {
  const user = password
    ? await Users.findOne({ email }).select('+password')
    : await Users.findOne({ email })
  return user
}

const findById = async (
  userId: string,
  password?: boolean
): Promise<UserDocument> => {
  const foundUser = !password
    ? await Users.findById(userId)
    : await Users.findById(userId).select('+password')

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await Users.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = Users.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}
export default {
  create,
  findAll,
  findByEmail,
  findById,
  update,
  deleteUser,
}
