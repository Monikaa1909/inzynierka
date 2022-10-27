import { Schema } from 'mongoose'

export interface Academy {
  _id: string
  academyName: string
}

export default new Schema({
  academyName: {
    type: String,
    unique: [true, 'There is already an academy with that name'],
    required: [true, 'Missing informations - each academy must have a name']
  }
})