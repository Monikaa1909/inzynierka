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
    min: [0, 'Must be at least 0, got {VALUE}'],
  },
  goalsScored: {
    type: Number,
    default: 0,
    get: (v:any) => Math.round(v),
    set: (v:any) => Math.round(v),
    min: [0, 'Must be at least 0, got {VALUE}'],
  },
  opponent: {
    type: String,
    default: 'Your opposite team'
  },
  date: Date,
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  }
})