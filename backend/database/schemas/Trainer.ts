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
  },
  phoneNumber: {
    type: String,
    match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'The phone number is invalid']
  },
  email: {
    type: String,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'The e-mail address is invalid']
  }
})