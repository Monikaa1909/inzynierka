import { Schema } from 'mongoose'
import { Parent } from './Parent'
import { Team } from './Team'

export interface Player {
  _id: string
  firstName: string
  lastName: string
  birthdayDate: string
  nationality: string
  remarks: string
  validityOfMedicalExaminations: string
  team?: Team
  parent?: Parent
}

export default new Schema({
  firstName: {
    type: String,
    required: [true, 'Missing informations - firstname is required']
  },
  lastName: {
    type: String,
    required: [true, 'Missing informations - lastname is required']
  },
  birthdayDate: {
    type: Date,
    required: [true, 'Missing informations - birthday date is required']
  },
  nationality: {
    type: String,
    required: [true, 'Missing informations - nationality is required']
  },
  remarks: {
    type: String,
    required: false
  },
  validityOfMedicalExaminations: {
    type: Date,
    required: [true, 'Missing informations - validity of medical examinations is required']
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: [true, 'Missing informations - each player must belong to the team']
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Parent"
  }
})