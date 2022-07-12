import { Schema } from 'mongoose'

export default new Schema({
  date: {      
    type: Date
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})