import { Schema } from 'mongoose'

export default new Schema({
  goalsConceded: {
    type: Number,
    default: 0
  },
  goalsScored: {
    type: Number,
    default: 0
  },
  opponent: String,
  date: Date,
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer"
  },
  object: {
    type: Schema.Types.ObjectId,
    ref: "Object"
  }
})