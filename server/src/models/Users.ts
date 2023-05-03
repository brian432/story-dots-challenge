import { Schema, model } from 'mongoose'
import { type IUser } from '../type'

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  passwordHash: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model<IUser>('User', UserSchema)

export default User
