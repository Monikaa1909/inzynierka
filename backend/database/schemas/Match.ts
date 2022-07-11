import { Schema } from 'mongoose'

export default new Schema({
  type: {
    type: String,
    enum: {
      values: ['Match', 'Tournament', 'Mecz', 'Turniej'],
      message: '{VALUE} is an invalid event type.'
    },
    required: [true, 'Type of event is required']
  },
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
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})