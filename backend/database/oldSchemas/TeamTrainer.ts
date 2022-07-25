import { Schema } from 'mongoose'

export default new Schema({
    team: {
        type: Schema.Types.ObjectId,
        required: [true, 'Missing informations - select the team to which you want to add the selected trainer']    
    },
    trainer: {
        type: Schema.Types.ObjectId,
        required: [true, 'Missing informations - select the trainer to which you want to add the selected team']    
    }
})