import { Schema } from 'mongoose'

export default new Schema({
  type: {
    type: String
  },
  date: Date,
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  object: {
    type: Schema.Types.ObjectId,
    ref: "Object"
  }
  // TODO [$62c82db8e38cdf06643f4b5d]: dodać listę obecności
})