import { Schema } from 'mongoose'

export default new Schema({
  firstName: String,
  lastName: String,
  birthdayDate: Date,
  nationality: String
})