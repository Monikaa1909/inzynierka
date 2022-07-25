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
        required: [true, 'Missing informations - each attendace list item must have a strictly defined training']  
    },
    attendance: {
        type: Boolean,
        default: false
    },
    remarks: {
        type: String
    }
})