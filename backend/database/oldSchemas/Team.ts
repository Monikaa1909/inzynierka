import { Schema } from 'mongoose'

export default new Schema({
  name: {
    type: String,
    required: [true, 'Missing informations - each team must have a name']
  },
  academy: {
    type: Schema.Types.ObjectId,
    ref: "Academy",
    required: [true, 'Missing informations - each team must belong to the academy']
  },
})