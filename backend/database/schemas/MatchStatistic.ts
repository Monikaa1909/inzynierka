import { Schema } from 'mongoose'

export default new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player"    
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: "Match"  
    },
    goalsScored: {
        type: Number,
        default: 0
    },
    yellowCards: {
        type: Number,
        default: 0
    },
    redCards: {
        type: Number,
        default: 0
    },
    minutesPlayed: {
        type: Number,
        default: 0
    },
    remarks: {
        type: String
    }
})