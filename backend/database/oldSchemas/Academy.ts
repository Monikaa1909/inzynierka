import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: [true, 'Missing informations - each academy must have a name']
  }
})