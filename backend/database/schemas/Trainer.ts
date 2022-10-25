import { Schema } from 'mongoose'
import { Academy } from './Academy'

export interface Trainer {
  _id: string
  firstName: string
  lastName: string
  birthdayDate: string
  nationality: string
  academy: Academy
  phoneNumber: string
  email: string
}

export default new Schema({
  firstName: {
    type: String,
    required: [true, 'Missing informations - firstname is required']
  },
  lastName: {
    type: String,
    required: [true, 'Missing informations - lastname is required']
  },
  birthdayDate: {
    type: Date,
    required: [true, 'Missing informations - birthday date is required']
  },
  nationality: {
    type: String,
    required: [true, 'Missing informations - nationality is required']
  },
  academy: {
    type: Schema.Types.ObjectId,
    required: [true, 'Missing informations - each trainer must belong to the academy']
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