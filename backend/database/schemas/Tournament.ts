import { Schema } from 'mongoose'

export default new Schema({
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: [true, 'Missing informations - each match or tournament must have a host (team)']
  },
  friendly: {
    type: Boolean,
    required: [true, 'Missing informations - tournament type is required']
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})