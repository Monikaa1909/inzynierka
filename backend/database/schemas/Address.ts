import { Schema } from 'mongoose'

export default new Schema({
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: Number,
    required: true,
    get: (v:any) => Math.round(v),
    set: (v:any) => Math.round(v),
    min: [1, 'House number must be at least 1, got {VALUE}'],
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true,
    match: [/^[0-9]{2}-[0-9]{3}$/, 'The postal code is invalid']
  }
})
