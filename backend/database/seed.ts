import models from './models'

export const seedDatabase = async () => {
    const players = [
        {
            firstName: 'Kasper',
            lastName: 'Seweryn',
            birthdayDate: Date.now(),
            nationality: 'Poland'
        },
        {
            firstName: 'Robert',
            lastName: 'Lewandowski',
            birthdayDate: Date.now(),
            nationality: 'Poland'
        }
    ]
    
    for (const player of players) {
        await new models.Player(player).save()
    }

    return { ok: true }
}
