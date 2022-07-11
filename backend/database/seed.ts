import models from './models'

export const seedDatabase = async () => {
    // for (const player of players) {
    //     await new models.Player(player).save()
    // }

    const team1 = await models.Team.create({
        name: 'młodzik'
    })
    const team2 = await models.Team.create({
        name: 'trampkarz'
    })
    const team3 = await models.Team.create({
        name: 'junior młodszy'
    })

    const parent1 = await models.Parent.create({
        firstName: 'Mariusz',
        lastName: 'Gruszka'
    })

    const player1 = await models.Player.create({
        firstName: 'Jan',
        lastName: 'Kowalski',
        birthdayDate: Date.now(),
        nationality: 'Polska',
        team: team1
    })
    const player2 = await models.Player.create({
        firstName: 'Henryk',
        lastName: 'Kapustka',
        birthdayDate: Date.now(),
        nationality: 'Polska',
        team: team1
    })
    const player3 = await models.Player.create({
        firstName: 'Eryk',
        lastName: 'Malech',
        birthdayDate: Date.now(),
        nationality: 'Litwa',
        team: team1
    })
    const player4 = await models.Player.create({
        firstName: 'Wojciech',
        lastName: 'Gruszka',
        birthdayDate: Date.now(),
        nationality: 'Polska',
        team: team2,
        parent: parent1
    })

    const trainer1 = await models.Trainer.create({
        firstName: 'Wojciech',
        lastName: 'Agrest',
        birthdayDate: Date.now(),
        nationality: 'Polska',
    })

    const teamTrainer1 = await models.TeamTrainer.create({
        team: team1,
        trainer:trainer1
    })

    const match1 = await models.Match.create({
        type: 'Match',
        goalsConceded: 2.3
    })
    const match2 = await models.Match.create({
        type: 'Match',
        goalsConceded: 4
    })
    const match3 = await models.Match.create({
        type: 'Mecz',
        goalsConceded: 1
    })

    const matchStatistic1 = await models.MatchStatistic.create({
        player: player1,
        match: match1,
        goalsScored: 1
    })
    const matchStatistic2 = await models.MatchStatistic.create({
        player: player1,
        match: match2,
        goalsScored: 3
    })

    return { ok: true }
}