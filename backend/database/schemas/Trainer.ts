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
  birthdayDate: {
    type: Date,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  academy: {
    type: Schema.Types.ObjectId,
    ref: "Academy"
  }
})