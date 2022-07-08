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
  // TODO: dodać listę obecności
})