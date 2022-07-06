import { Schema } from 'mongoose'

export default new Schema({
  name: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player"
    }
  ]
})