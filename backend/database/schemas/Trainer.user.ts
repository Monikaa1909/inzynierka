import { InferSchemaType, Schema } from 'mongoose'
import { User } from './User'

const schema = new Schema({
  birthdayDate: {
    type: Date,
    required: [true, 'Missing informations - birthday date is required']
  },
  nationality: {
    type: String,
    required: [true, 'Missing informations - nationality is required']
  },
  phoneNumber: {
    type: String,
    match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'The phone number is invalid']
  },
  remarks: {
    type: String,
    required: false
  },
})

export type Trainer = InferSchemaType<typeof schema> & User

export default schema