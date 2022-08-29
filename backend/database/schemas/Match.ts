import { Schema } from 'mongoose'

export default new Schema({
  goalsConceded: {
    type: Number,
    default: 0,
    get: (v:any) => Math.round(v),
    set: (v:any) => Math.round(v),
    min: [0, 'Number of goals conceded must be at least 0, got {VALUE}'],
  },
  goalsScored: {
    type: Number,
    default: 0,
    get: (v:any) => Math.round(v),
    set: (v:any) => Math.round(v),
    min: [0, 'Number of goals scored must be at least 0, got {VALUE}'],
  },
  opponent: {
    type: String,
    default: 'Your opposite team'
  },
  date: {
    type: Date
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: [true, 'Missing informations - each match or tournament must have a host (team)']
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})