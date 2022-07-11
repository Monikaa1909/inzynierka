import { Schema } from 'mongoose'

export default new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"    
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player"    
    }
})