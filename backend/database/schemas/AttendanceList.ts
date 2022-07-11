import { Schema } from 'mongoose'

export default new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player"    
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training"  
    },
    attendance: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String
    }
})