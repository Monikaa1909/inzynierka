import { Schema } from 'mongoose'

export default new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player"    
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Event"  
    },
    attendance: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String
    }
})