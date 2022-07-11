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
  // TODO [$62cc505d623fc106a0d40855]: validation for phoneNumber and email
  phoneNumber: String,
  email: String
})