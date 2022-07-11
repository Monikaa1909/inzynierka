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
        default: 0,
        get: (v:any) => Math.round(v),
        set: (v:any) => Math.round(v),
        min: [0, 'Number of goals scored must be at least 0, got {VALUE}'],
    },
    yellowCards: {
        type: Number,
        default: 0,
        get: (v:any) => Math.round(v),
        set: (v:any) => Math.round(v),
        min: [0, 'Number of yellow cards must be at least 0, got {VALUE}'],
        max: [2, 'Number of yellow cards must be at most 2, got {VALUE}']
    },
    redCards: {
        type: Number,
        default: 0,
        get: (v:any) => Math.round(v),
        set: (v:any) => Math.round(v),
        min: [0, 'Number of yellow cards must be at least 0, got {VALUE}'],
        max: [1, 'Number of yellow cards must be at most 1, got {VALUE}']
    },
    minutesPlayed: {
        type: Number,
        default: 0,
        get: (v:any) => Math.round(v),
        set: (v:any) => Math.round(v),
        min: [0, 'Number of minutes played must be at least 0, got {VALUE}'],
        max: [90, 'Number of minutes played must be at most 90, got {VALUE}']
    },
    remarks: {
        type: String
    }
})