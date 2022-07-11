import { Schema } from 'mongoose'

export default new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  // TODO: validation for phoneNumber and email
  phoneNumber: String,
  email: String
})