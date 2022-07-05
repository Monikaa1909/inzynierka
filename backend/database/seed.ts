import mongoose from 'mongoose'
import { Player } from './models'

export const seedDatabase = async () => {
    await mongoose.connection.db.dropDatabase()
    
    
    const players = [
        {
            firstName: 'Kasper',
            lastName: 'Seweryn'
        }
    ]
    
    for (const player of players) {
        await new Player(player).save()
    }

    return { ok: true }
}
