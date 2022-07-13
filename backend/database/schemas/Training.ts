import { Schema } from 'mongoose'

export default new Schema({
  date: {      
    type: Date
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: [true, 'Missing informations - each training or tournament must have a host (team)']
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})