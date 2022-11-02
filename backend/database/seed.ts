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
        academy: academy1
    });
    trainer2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const trainer3 = new models.Trainer({
        firstName: 'Paweł',
        lastName: 'Sokólski',
        birthdayDate: '1989-12-11',
        nationality: 'Polska',
        academy: academy1
    });
    trainer3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const trainer4 = new models.Trainer({
        firstName: 'Piotr',
        lastName: 'Zajączkowski',
        birthdayDate: '1998-01-20',
        nationality: 'Polska',
        academy: academy1
    });
    trainer4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TEAMS -------------------------------------------------------------------------------------
    const team1 = new models.Team({
        teamName: 'Żak',
        trainer: trainer1,
        startYear: 2014,
        endYear: 2016
    });
    team1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team2 = new models.Team({
        teamName: 'Orlik 1',
        trainer: trainer2,
        startYear: 2012,
        endYear: 2014
    });
    team2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team3 = new models.Team({
        teamName: 'Orlik 2',
        trainer: trainer3,
        startYear: 2012,
        endYear: 2014
    });
    team3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team4 = new models.Team({
        teamName: 'Młodzik',
        trainer: trainer4,
        startYear: 2010,
        endYear: 2012
    });
    team4.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team5 = new models.Team({
        teamName: 'Trampkarz',
        trainer: trainer4,
        startYear: 2008,
        endYear: 2010
    });
    team5.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team6 = new models.Team({
        teamName: 'Junior młodszy',
        trainer: trainer1,
        startYear: 2006,
        endYear: 2008
    });
    team6.save(function (err) {
        if (err) return console.log(err.message);
    });

    const team7 = new models.Team({
        teamName: 'Junior starszy',
        trainer: trainer3,
        startYear: 2004,
        endYear: 2005
    });
    team7.save(function (err) {
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
        academy: academy1
    });
    parent2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const parent3 = new models.Parent({
        firstName: 'Antoni',
        lastName: 'Wierzba',
        academy: academy1
    });
    parent3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const parent4 = new models.Parent({
        firstName: 'Mariusz',
        lastName: 'Gruszka',
        email: 'mGruszka@gmail.com',
        academy: academy1
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
        team: team1,
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
        team: team1,
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
        team: team1,
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
        team: team4,
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

    const sportsFacility2 = new models.SportsFacility({
        name: "Orlik przy Kwiatowej",
        academy: academy1,
        street: 'Kwiatowa',
        houseNumber: 7,
        city: 'Białystok',
        postalCode: '15-323'
    });
    sportsFacility2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const sportsFacility3 = new models.SportsFacility({
        name: "Boisko 'Mechaniak'",
        academy: academy1,
        street: 'Broniewskiego',
        houseNumber: 17,
        city: 'Białystok',
        postalCode: '15-323'
    });
    sportsFacility3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const sportsFacility4 = new models.SportsFacility({
        name: "Ośrodek szkoleniowy AP Jagiellonia Białystok",
        academy: academy1,
        street: 'Elewatorska',
        houseNumber: 4,
        city: 'Białystok',
        postalCode: '15-323'
    });
    sportsFacility4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // MATCHES ----------------------------------------------------------------------------
    const match1 = new models.Match({
        team: team1,
        goalsConceded: 3,
        goalsScored: 4,
        opponent: 'Legia Warszawa',
        date: new Date('2022-11-13 10:30:00'),
        sportsFacility: sportsFacility2
    });
    match1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const match2 = new models.Match({
        team: team1,
        goalsConceded: 1,
        goalsScored: 1,
        opponent: 'Korona Kielce',
        date: new Date('2022-11-17 13:00:00'),
        sportsFacility: sportsFacility3
    });
    match2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const match3 = new models.Match({
        team: team3,
        goalsConceded: 0,
        goalsScored: 1,
        opponent: 'Lechia Gdańsk',
        date: new Date('2022-11-24 11:00:00'),
        sportsFacility: sportsFacility3
    });
    match3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const match4 = new models.Match({
        team: team4,
        goalsConceded: 2,
        goalsScored: 1,
        opponent: 'Lechia Gdańsk',
        date: new Date('2022-11-24 13:00:00'),
        sportsFacility: sportsFacility1
    });
    match4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // MATCHESSTATISTIC ----------------------------------------------------------------------------
    const matchStatistic1 = new models.MatchStatistic({
        player: player1,
        match: match1,
        goalsScored: 1,
        yellowCards: 1,
        minutesPlayed: 67,
        attendance: true
    });
    matchStatistic1.save(function (err) {
        if (err) return console.log(err.message);
    });
    const matchStatistic2 = new models.MatchStatistic({
        player: player2,
        match: match1,
        goalsScored: 3,
        minutesPlayed: 90,
        attendance: true
    });
    matchStatistic2.save(function (err) {
        if (err) return console.log(err.message);
    });
    const matchStatistic3 = new models.MatchStatistic({
        player: player3,
        match: match1,
        minutesPlayed: 89,
        remarks: 'Doznał kontuzji prawego kolana',
        attendance: true
    });
    matchStatistic3.save(function (err) {
        if (err) return console.log(err.message);
    });
    const matchStatistic4 = new models.MatchStatistic({
        player: player4,
        match: match1,
        goalsScored: 2,
        minutesPlayed: 90,
        attendance: true
    });
    matchStatistic4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TOURNAMENTS ----------------------------------------------------------------------------
    const tournament1 = new models.Tournament({
        tournamentName: 'Towarzyski turniej "KopaninaCup"',
        startDate: new Date("2022, 11, 13"),
        endDate: new Date("2022, 11, 15"),
        sportsFacility: sportsFacility3,
        friendly: true,
        team: team1
    });
    tournament1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const tournament2 = new models.Tournament({
        tournamentName: 'Turniej o Puchar Burmistrza Wasilkowa',
        startDate: new Date('2022-11-01 10:05:00'),
        endDate: new Date('2022-11-02 19:00:00'),
        sportsFacility: sportsFacility3,
        friendly: false,
        team: team3
    });
    tournament2.save(function (err) {
        if (err) return console.log(err.message);
    });

     // TOURNAMENTSTATISTIC ----------------------------------------------------------------------------
     const tournamentStatistic1 = new models.TournamentStatistic({
        player: player1,
        tournament: tournament1,
        goalsScored: 1,
        yellowCards: 1,
        minutesPlayed: 67,
        attendance: true
    });
    tournamentStatistic1.save(function (err) {
        if (err) return console.log(err.message);
    });
    const tournamentStatistic2 = new models.TournamentStatistic({
        player: player2,
        tournament: tournament1,
        goalsScored: 3,
        minutesPlayed: 90,
        attendance: true
    });
    tournamentStatistic2.save(function (err) {
        if (err) return console.log(err.message);
    });
    const tournamentStatistic3 = new models.TournamentStatistic({
        player: player3,
        tournament: tournament1,
        minutesPlayed: 89,
        remarks: 'Doznał kontuzji prawego kolana',
        attendance: true
    });
    tournamentStatistic3.save(function (err) {
        if (err) return console.log(err.message);
    });
    const tournamentStatistic4 = new models.TournamentStatistic({
        player: player4,
        tournament: tournament1,
        goalsScored: 0,
        minutesPlayed: 0,
    });
    tournamentStatistic4.save(function (err) {
        if (err) return console.log(err.message);
    });

    // TRAININGS ----------------------------------------------------------------------------
    const training1 = new models.Training({
        date: new Date('2022-11-20 15:30'),
        sportsFacility: sportsFacility1,
        team: team1,

    });
    training1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const training2 = new models.Training({
        date: new Date('2022-11-07 17:05'),
        sportsFacility: sportsFacility1,
        team: team4
    });
    training2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const training3 = new models.Training({
        date: new Date('2022-11-08 17:05'),
        sportsFacility: sportsFacility1,
        team: team4
    });
    training3.save(function (err) {
        if (err) return console.log(err.message);
    });

    // ATTENDANCE LISTS ----------------------------------------------------------------------------
    const attendaceList1 = new models.AttendanceList({
        player: player1,
        training: training1,
        attendance: true,
    });
    attendaceList1.save(function (err) {
        if (err) return console.log(err.message);
    });

    const attendaceList2 = new models.AttendanceList({
        player: player2,
        training: training1,
        attendance: true,
    });
    attendaceList2.save(function (err) {
        if (err) return console.log(err.message);
    });

    const attendaceList3 = new models.AttendanceList({
        player: player3,
        training: training1,
        attendance: true,
    });
    attendaceList3.save(function (err) {
        if (err) return console.log(err.message);
    });

    const attendaceList4 = new models.AttendanceList({
        player: player4,
        training: training1,
        remarks: 'Nieobecność zgłoszona wcześniej',
    });
    attendaceList4.save(function (err) {
        if (err) return console.log(err.message);
    });

    const attendaceList5 = new models.AttendanceList({
        player: player5,
        training: training2,
        attendance: true,
    });
    attendaceList5.save(function (err) {
        if (err) return console.log(err.message);
    });

    return { ok: true }
}
