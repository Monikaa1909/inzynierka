import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: [true, 'Missing informations - each team must have a name']
  },
  startYear: {
    type: Number,
    length: [4, 'The year may not be less than 1000 and greater than 9999'],
  },
  endYear: {
    type: Number,
    length: [4, 'The year may not be less than 1000 and greater than 9999'],
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
    required: [true, 'Missing informations - each team must belong to the trainer']
  },
})