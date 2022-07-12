import { Schema } from 'mongoose'

export default new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true    
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: true    
    }
})