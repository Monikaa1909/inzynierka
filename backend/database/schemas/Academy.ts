import { InferSchemaType, Schema } from 'mongoose'

const schema = new Schema({
  academyName: {
    type: String,
    unique: [true, 'There is already an academy with that name'],
    required: [true, 'Missing informations - each academy must have a name']
  }
})

export type Academy = InferSchemaType<typeof schema>

export default schema