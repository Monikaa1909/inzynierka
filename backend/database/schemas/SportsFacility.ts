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
  // TODO [#8]: validation for address
  address: String
})