import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: [true, 'Missing informations - each team must have a name']
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
    required: [true, 'Missing informations - each team must belong to the trainer']
  },
})