import { Schema } from 'mongoose'

export default new Schema({
  firstName: String,
  lastName: String,
  birthdayDate: Date,
  nationality: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Parent"
  }
})