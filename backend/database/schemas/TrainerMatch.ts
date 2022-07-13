import { Schema } from 'mongoose'

export default new Schema({
    trainer: {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
        required: [true, 'Missing informations - select the trainer to which you want to add the selected match']    
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        required: [true, 'Missing informations - select the match to which you want to add the selected trainer']  
    }
})