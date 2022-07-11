import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: true
  },
  academy: {
    type: Schema.Types.ObjectId,
    ref: "Academy"
  },
  // TODO: validation for address
  address: String
})