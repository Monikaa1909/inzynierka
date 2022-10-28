import { Schema } from 'mongoose'
import { Academy } from './Academy'

export interface SportsFacility {
  _id: string
  name: string
  academy: Academy
  street: string
  houseNumber: string
  city: string
  postalCode: string,
  remarks?: string
}


export default new Schema({
  name: {
    type: String,
    required: [true, 'Missing informations - each sports facility must have a name']
  },
  academy: {
    type: Schema.Types.ObjectId,
    ref: "Academy",
    required: [true, 'Missing informations - each sports facility must belong to the academy']
  },
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
  },
  remarks: {
    type: String,
    required: false
  }
})
