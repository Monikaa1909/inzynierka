import { Schema } from 'mongoose'
import { Match } from './Match'
import { Player } from './Player'

export interface MatchStatistic {
    _id: string
    player: Player
    match: Match
    goalsScored?: number
    yellowCards?: number,
    redCards?: number,
    minutesPlayed?: number,
    remarks?: string,
    attendance?: boolean
}

export default new Schema({
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: [true, 'Missing informations - each match statistic item must have a strictly defined player']
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        required: [true, 'Missing informations - each match statistic item must have a strictly defined match']
    },
    goalsScored: {
        type: Number,
        default: 0,
        get: (v: any) => Math.round(v),
        set: (v: any) => Math.round(v),
        min: [0, 'Number of goals scored must be at least 0, got {VALUE}'],
    },
    yellowCards: {
        type: Number,
        default: 0,
        get: (v: any) => Math.round(v),
        set: (v: any) => Math.round(v),
        min: [0, 'Number of yellow cards must be at least 0, got {VALUE}'],
        max: [2, 'Number of yellow cards must be at most 2, got {VALUE}']
    },
    redCards: {
        type: Number,
        default: 0,
        get: (v: any) => Math.round(v),
        set: (v: any) => Math.round(v),
        min: [0, 'Number of yellow cards must be at least 0, got {VALUE}'],
        max: [1, 'Number of yellow cards must be at most 1, got {VALUE}']
    },
    minutesPlayed: {
        type: Number,
        default: 0,
        get: (v: any) => Math.round(v),
        set: (v: any) => Math.round(v),
        min: [0, 'Number of minutes played must be at least 0, got {VALUE}'],
    },
    remarks: {
        type: String
    },
    attendance: {
        type: Boolean,
        default: false
    },
})