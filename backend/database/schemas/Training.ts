import { Schema } from 'mongoose'

export default new Schema({
  date: Date,
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer"
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})