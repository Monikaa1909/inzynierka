import { SportsFacility } from './SportsFacility'
import { Schema } from 'mongoose'
import { Team } from './Team'

export interface Training {
  _id: string
  date: Date,
  team: Team,
  sportsFacility?: SportsFacility
  remarks?: string
}

export default new Schema({
  date: {      
    type: Date,
    required: [true, 'Missing informations - each training must have date']
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: [true, 'Missing informations - each training or tournament must have a host (team)']
  },
  sportsFacility: {
    type: Schema.Types.ObjectId,
    ref: "SportsFacility"
  },
  remarks: {
    type: String,
    required: false
  },
})