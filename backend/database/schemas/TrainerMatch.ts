import { Schema } from 'mongoose'

export default new Schema({
    trener: {
        type: Schema.Types.ObjectId,
        ref: "Trainer"    
    },
    match: {
        type: Schema.Types.ObjectId,
        ref: "Match"  
    }
})