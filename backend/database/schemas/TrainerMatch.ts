import { Schema } from 'mongoose'

export default new Schema({
    trener: {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
        required: true    
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match",
        required: true  
    }
})