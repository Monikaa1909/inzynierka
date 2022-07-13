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
    const parent1 = new models.Parent({ 
        firstName: 'Mariusz',
        lastName: 'Gruszka',
        email: 'mGruszka@gmail.com'
    });
    parent1.save(function (err) {
        if (err) return console.log(err.message);
    });
    
    const parent2 = new models.Parent({ 
        firstName: 'Jerzy',
        lastName: 'Kowalski',
        email: 'kowalj123@gmail.com',
        phoneNumber: '125 653 444'
    });
    parent2.save(function (err) {
        if (err) return console.log(err.message);
    });

    // PLAYERS --------------------------------------------------------------------------------
    const player1 = new models.Player({ 
        firstName: 'Jan',
        lastName: 'Kowalski',
        birthdayDate: '2010-12-09',
        nationality: 'Polska',
        parent: parent2,
        academy: academy1
    });
    player1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const player2 = new models.Player({ 
        firstName: 'Henryk',
        lastName: 'Kapustka',
        birthdayDate: '2011-11-09',
        nationality: 'Polska',
        academy: academy1
    });
    player2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const player3 = new models.Player({ 
        firstName: 'Henryk',
        lastName: 'Kapustka',
        birthdayDate: '2011-01-19',
        nationality: 'Polska',
        academy: academy1
    });
    player3.save(function (err) {
        if (err) return console.log(err.message);
    });
    
    const player4 = new models.Player({ 
        firstName: 'Wojciech',
        lastName: 'Gruszka',
        birthdayDate: '2010-01-19',
        nationality: 'Polska',
        academy: academy1,
        parent: parent1
    });
    player4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // PLAYERTEAMS ---------------------------------------------------------------------------
    const playerTeam1 = new models.PlayerTeam({ 
        team: team1,
        player: player1
    });
    playerTeam1.save(function (err) {
        if (err) return console.log(err.message);
    });
    
    // TRAINERS -----------------------------------------------------------------------------
    const trainer1 = new models.Trainer({ 
        firstName: 'Wojciech',
        lastName: 'Agrest',
        birthdayDate: '1978-01-29',
        nationality: 'Polska',
        academy: academy1
    });
    trainer1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TEAMTRAINERS -------------------------------------------------------------------------
    const teamTrainer1 = new models.TeamTrainer({ 
        team: team1,
        trainer:trainer1
    });
    teamTrainer1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // ADDRESS ----------------------------------------------------------------------------
    const address1 = new models.Address({ 
        street: 'Słoneczna',
        houseNumber: 1,
        city: 'Białystok',
        postalCode: '15-323'
    });
    address1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // SPORTSFACILITIES ----------------------------------------------------------------------------
    const sportsFacility1 = new models.SportsFacility({ 
        name: "Stadion Miejski w Białymstoku",
        academy: academy1,
        address: address1
    });
    sportsFacility1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // MATCHES ----------------------------------------------------------------------------
    const match1 = new models.Match({ 
        type: 'Match', 
        team: team1,
        goalsConceded: 3
    });
    match1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // MATCHES ----------------------------------------------------------------------------
    const matchStatistic1 = new models.MatchStatistic({ 
        player: player1,
        match: match1,
        goalsScored: 1
    });
    matchStatistic1.save(function (err) {
        if (err) return console.log(err.message);
    });
    const matchStatistic2 = new models.MatchStatistic({ 
        player: player2,
        match: match1,
        goalsScored: 3
    });
    matchStatistic2.save(function (err) {
        if (err) return console.log(err.message);
    });

    return { ok: true }
}
