import models from './models'

export const seedDatabase = async () => {

    // ACADEMIES ---------------------------------------------------------------------------------
    const academy1 = new models.Academy({ academyName: 'AP Jagiellonia Białystok' });
    academy1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const academy2 = new models.Academy({ academyName: 'Biebrza Goniądz' });
    academy2.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TRAINERS -----------------------------------------------------------------------------
    const trainer1 = new models.Trainer({
        firstName: 'Jerzy',
        lastName: 'Pikulski',
        birthdayDate: '1975-02-19',
        nationality: 'Polska',
        academy: academy1
    });
    trainer1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const trainer2 = new models.Trainer({
        firstName: 'Wojciech',
        lastName: 'Agrest',
        birthdayDate: '1978-01-29',
        nationality: 'Polska',
        academy: academy2
    });
    trainer2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const trainer3 = new models.Trainer({
        firstName: 'Paweł',
        lastName: 'Sokólski',
        birthdayDate: '1989-12-11',
        nationality: 'Polska',
        academy: academy2
    });
    trainer3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const trainer4 = new models.Trainer({
        firstName: 'Piotr',
        lastName: 'Zajączkowski',
        birthdayDate: '1998-01-20',
        nationality: 'Polska',
        academy: academy2
    });
    trainer4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TEAMS -------------------------------------------------------------------------------------
    const team1 = new models.Team({
        teamName: 'Młodzik D1',
        trainer: trainer1,
    });
    team1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team2 = new models.Team({
        teamName: 'Trampkarz C1',
        trainer: trainer2,
    });
    team2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team3 = new models.Team({
        teamName: 'Junior młodszy B1',
        trainer: trainer1,
    });
    team3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team4 = new models.Team({
        teamName: 'Junior młodszy B2',
        trainer: trainer2,
    });
    team4.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team5 = new models.Team({
        teamName: 'Młodzik D1',
        trainer: trainer2,
    });
    team5.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team6 = new models.Team({
        teamName: 'Trampkarz C1',
        trainer: trainer1,
    });
    team6.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team7 = new models.Team({
        teamName: 'Młodzik D2',
        trainer: trainer3,
    });
    team7.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team8 = new models.Team({
        teamName: 'Orlik E1',
        trainer: trainer1,
    });
    team8.save(function (err) {
        if (err) return console.log(err.message);
    });

    // PARENTS ---------------------------------------------------------------------------------  
    const parent1 = new models.Parent({
        firstName: 'Jerzy',
        lastName: 'Kowalski',
        email: 'kowalj123@gmail.com',
        phoneNumber: '125 653 444',
        academy: academy1
    });
    parent1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const parent2 = new models.Parent({
        firstName: 'Jan',
        lastName: 'Kapustka',
        email: 'kapucha123@gmail.com',
        phoneNumber: '125 653 444',
        academy: academy2
    });
    parent2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const parent3 = new models.Parent({
        firstName: 'Antoni',
        lastName: 'Wierzba',
        academy: academy2
    });
    parent3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const parent4 = new models.Parent({
        firstName: 'Mariusz',
        lastName: 'Gruszka',
        email: 'mGruszka@gmail.com',
        academy: academy2
    });
    parent4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // PLAYERS --------------------------------------------------------------------------------
    const player1 = new models.Player({
        firstName: 'Jan',
        lastName: 'Kowalski',
        birthdayDate: '2010-12-09',
        nationality: 'Polska',
        parent: parent1,
        team: team1,
        validityOfMedicalExaminations: '2023-02-19'
    });
    player1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const player2 = new models.Player({
        firstName: 'Henryk',
        lastName: 'Kapustka',
        birthdayDate: '2011-11-09',
        nationality: 'Polska',
        parent: parent2,
        team: team2,
        validityOfMedicalExaminations: '2022-12-09'
    });
    player2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const player3 = new models.Player({
        firstName: 'Henryk',
        lastName: 'Wierzba',
        birthdayDate: '2010-01-19',
        nationality: 'Polska',
        parent: parent3,
        team: team2,
        validityOfMedicalExaminations: '2022-12-09'
    });
    player3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const player4 = new models.Player({
        firstName: 'Wojciech',
        lastName: 'Gruszka',
        birthdayDate: '2010-01-19',
        nationality: 'Polska',
        team: team4,
        parent: parent4,
        validityOfMedicalExaminations: '2022-12-09'
    });
    player4.save(function (err) {
        if (err) return console.log(err.message);
    });

    const player5 = new models.Player({
        firstName: 'Aleksander',
        lastName: 'Kowalski',
        birthdayDate: '2010-12-09',
        nationality: 'Polska',
        parent: parent1,
        team: team1,
        validityOfMedicalExaminations: '2022-12-09'
    });
    player5.save(function (err) {
        if (err) return console.log(err.message);
    });

    // SPORTSFACILITIES ----------------------------------------------------------------------------
    const sportsFacility1 = new models.SportsFacility({
        name: "Stadion Miejski w Białymstoku",
        academy: academy1,
        street: 'Słoneczna',
        houseNumber: 1,
        city: 'Białystok',
        postalCode: '15-323'
    });
    sportsFacility1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // MATCHES ----------------------------------------------------------------------------
    const match1 = new models.Match({
        team: team1,
        goalsConceded: 3
    });
    match1.save(function (err) {
        if (err) return console.log(err.message);
    });

    // MATCHESSTATISTIC ----------------------------------------------------------------------------
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
