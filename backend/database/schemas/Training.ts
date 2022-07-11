import { Schema } from 'mongoose'

export default new Schema({
  type: {
    type: String
    // trening/mecz/turniej?
  },
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