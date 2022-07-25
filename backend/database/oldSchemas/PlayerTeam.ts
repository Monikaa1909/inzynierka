import { Schema } from 'mongoose'

export default new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: [true, 'Missing informations - select the team to which you want to add the selected player']    
    },
    player: {
        type: Schema.Types.ObjectId,
        ref: "Player",
        required: [true, 'Missing informations - select the player you want to add to the selected team']    
    }
})