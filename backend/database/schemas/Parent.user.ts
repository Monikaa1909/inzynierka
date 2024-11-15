import { InferSchemaType, Schema } from 'mongoose'
import { User } from './User'

const schema = new Schema({
  phoneNumber: {
    type: String,
    match:[/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'The phone number is invalid']
  },
  remarks: {
    type: String,
    required: false
  },
})

export type Parent = InferSchemaType<typeof schema> & User & {_id: string}

export default schema