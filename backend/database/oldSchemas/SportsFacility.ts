import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: [true, 'Missing informations - each sports facility must have a name']
  },
  academy: {
    type: Schema.Types.ObjectId,
    ref: "Academy",
    required: [true, 'Missing informations - each sports facility must belong to the academy']
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  }
})
