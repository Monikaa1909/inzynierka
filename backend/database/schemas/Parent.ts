import { Schema } from 'mongoose'

export interface Parent {
  _id: string
  firstName: string
  lastName: string
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
  phoneNumber: {
    type: String,
    match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'The phone number is invalid']
  },
  email: {
    type: String,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'The e-mail address is invalid']
  }
})