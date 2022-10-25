import { Schema } from 'mongoose'

export interface Academy {
  _id: string
  name: string
}

export default new Schema({
  name: {
    type: String,
    unique: [true, 'There is already an academy with that name'],
    required: [true, 'Missing informations - each academy must have a name']
  }
})