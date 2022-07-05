import models from './models'

export const seedDatabase = async () => {
    const players = [
        {
            firstName: 'Kasper',
            lastName: 'Seweryn'
        }
    ]
    
    for (const player of players) {
        await new models.Player(player).save()
    }

    return { ok: true }
}
