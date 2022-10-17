import { Schema } from 'mongoose'

export default new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: [true, 'Missing informations - each attendace list item must have a strictly defined player'] 
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training",
        required: [false]  
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        required: [false]  
    },
    tournaments: {
        type: Schema.Types.ObjectId,
        ref: "Tournament",
        required: [false]  
    },
    attendance: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String
    }
})