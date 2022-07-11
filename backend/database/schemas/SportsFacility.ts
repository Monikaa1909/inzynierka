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
  // TODO [$62cc505d623fc106a0d40856]: validation for address
  address: String
})