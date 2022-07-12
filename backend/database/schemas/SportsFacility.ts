import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: true
  },
  academy: {
    type: Schema.Types.ObjectId,
    ref: "Academy",
    required: true
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  }
})
