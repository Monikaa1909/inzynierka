import { Schema } from 'mongoose'

export default new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true  
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training",
        required: true  
    },
    attendance: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String
    }
})