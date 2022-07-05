import mongoose from 'mongoose'
import PlayerSchema from './schemas/Player'

export const Player = mongoose.model('Player', PlayerSchema) 