import { Schema } from 'mongoose'

export default new Schema({
    trener: {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
        required: true   
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training",
        required: true
    }
})