import { Training } from './Training'
import { Player } from './Player'
import { Schema } from 'mongoose'

export interface AttendanceList {
    _id: string
    player: Player,
    training: Training,
    attendance?: boolean
    remarks?: string
  }

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