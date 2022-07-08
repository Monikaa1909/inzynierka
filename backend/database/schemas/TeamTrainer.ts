import { Schema } from 'mongoose'

export default new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"    
    },
    trainer: {
        type: Schema.Types.ObjectId,
        ref: "Trainer"    
    }
})