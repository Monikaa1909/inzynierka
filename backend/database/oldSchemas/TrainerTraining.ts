import { Schema } from 'mongoose'

export default new Schema({
    trainer: {
        type: Schema.Types.ObjectId,
        ref: "Trainer",
        required: [true, 'Missing informations - select the trainer to which you want to add the selected training']   
    },
    training: {
        type: Schema.Types.ObjectId,
        ref: "Training",
        required: [true, 'Missing informations - select the training to which you want to add the selected trainer']
    }
})