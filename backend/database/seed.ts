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

    const teams = [
        {
            name: 'młodzik'
        },
        {
            name: 'junior młodszy'
        }
    ]

    for (const team of teams) {
        await new models.Team(team).save()
    }

    return { ok: true }
}
