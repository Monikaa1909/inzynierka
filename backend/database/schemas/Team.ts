import { Schema } from 'mongoose'
import { Trainer } from './Trainer'

export interface Team {
  _id: string
  teamName: string
  startYear: Number
  endYear: Number
  trainer: Trainer
}

export default new Schema({
  teamName: {
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
  }
})