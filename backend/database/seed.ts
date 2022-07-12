import models from './models'

export const seedDatabase = async () => {

    // ACADEMIES ---------------------------------------------------------------------------------
    const academy1 = new models.Academy({ name: 'AP Jagiellonia Białystok' });
    academy1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TEAMS -------------------------------------------------------------------------------------
    const team1 = new models.Team({ 
        name: 'młodzik',
        academy: academy1
    });
    team1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team2 = new models.Team({ 
        name: 'trampkarz',
        academy: academy1
    });
    team2.save(function (err) {
        if (err) return console.log(err.message);
    });
    
    const team3 = new models.Team({ 
        name: 'junior młodszy',
        academy: academy1
    });
    team3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team4 = new models.Team({ 
        name: 'junior starszy',
        academy: academy1 
    });
    team4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // PARENTS ---------------------------------------------------------------------------------
    const parent1 = await models.Parent.create({
        firstName: 'Mariusz',
        lastName: 'Gruszka',
        email: 'mGruszka@gmail.com'
    })
    const parent2 = await models.Parent.create({
        firstName: 'Jerzy',
        lastName: 'Kowalski',
        email: 'kowalj123@gmail.com'
    })

    // PLAYERS --------------------------------------------------------------------------------
    const player1 = await models.Player.create({
        firstName: 'Jan',
        lastName: 'Kowalski',
        birthdayDate: Date.now(),
        nationality: 'Polska',
        parent: parent2,
        academy: team1
    })
    const player2 = await models.Player.create({
        firstName: 'Henryk',
        lastName: 'Kapustka',
        birthdayDate: Date.now(),
        nationality: 'Polska',
        academy: team1
    })
    const player3 = await models.Player.create({
        firstName: 'Eryk',
        lastName: 'Malech',
        birthdayDate: Date.now(),
        nationality: 'Litwa',
        academy: team1
    })
    const player4 = await models.Player.create({
        firstName: 'Wojciech',
        lastName: 'Gruszka',
        birthdayDate: Date.now(),
        nationality: 'Polska',
        academy: academy1,
        parent: parent1
    })

    const playerTeam1 = await models.PlayerTeam.create({
        team: team1,
        player: player1
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

    const match1 = new models.Match({ type: 'Match', team: team1,goalsConceded: 3 });
    match1.save(function (err) {
        if (err) return console.log(err.message);
    });
    // const match1 = await models.Match.create({
    //     type: 'Match',
    //     goalsConceded: 2.3
    // })
    // const match2 = await models.Match.create({
    //     type: 'Match',
    //     goalsConceded: 4
    // })
    // const match3 = await models.Match.create({
    //     type: 'Mecz',
    //     goalsConceded: 1
    // })

    // const matchStatistic1 = await models.MatchStatistic.create({
    //     player: player1,
    //     match: match1,
    //     goalsScored: 1
    // })
    // const matchStatistic2 = await models.MatchStatistic.create({
    //     player: player1,
    //     match: match2,
    //     goalsScored: 3
    // })

    const address1 = await models.Address.create({
        street: 'Słoneczna',
        houseNumber: 1,
        city: 'Białystok',
        postalCode: '15-323'
    })

    const sportsFacility1 = await models.SportsFacility.create({
        name: "Stadion Miejski w Białymstoku",
        academy: academy1,
        address: address1
    })

    return { ok: true }
}
