import { Schema } from 'mongoose'

export default new Schema({
    trener: {
        type: Schema.Types.ObjectId,
        ref: "Trainer"    
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training"  
    }
})