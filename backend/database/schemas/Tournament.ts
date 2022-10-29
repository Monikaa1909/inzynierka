import { SportsFacility } from './SportsFacility'
import { Schema } from 'mongoose'
import { Team } from './Team'

export interface Tournament {
  _id: string,
  tournamentName?: string,
  startDate: Date,
  endDate: Date,
  team: Team,
  friendly: Boolean
  sportsFacility?: SportsFacility
}

export default new Schema({
  tournamentName: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: [true, 'Missing informations - each tournament must have a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Missing informations - each tournament must have a end date']
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