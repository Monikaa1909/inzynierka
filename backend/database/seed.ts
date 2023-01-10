import models from './models'

export const seedDatabase = async () => {

	// ACADEMIES ---------------------------------------------------------------------------------
	const academy1 = new models.Academy({ academyName: 'Biebrza Goniądz' });
	academy1.save(function (err) {
		if (err) return console.log(err.message);
	});

	const academy2 = new models.Academy({ academyName: 'AP Jagiellonia Białystok' });
	academy2.save(function (err) {
		if (err) return console.log(err.message);
	});

	// ACADEMIES MANAGERS ---------------------------------------------------------------------------------
	const academyManager1 = new models.AcademyManager({
		firstName: 'Monika',
		lastName: 'Słowikowska',
		birthdayDate: '200-09-10',
		nationality: 'Polska',
		academy: academy1,
		login: 'monikaa1909',
		password: 'Coolhaslo1',
		email: 'monikaa1909@gmail.com',
	})
	academyManager1.save(function (err) {
		if (err) return console.log(err.message)
	})

	const academyManager2 = new models.AcademyManager({
		firstName: 'Jan',
		lastName: 'Duda',
		birthdayDate: '200-09-10',
		nationality: 'Polska',
		academy: academy2,
		login: 'janduda213',
		password: 'jan123',
		email: 'jan123@gmail.com',
	})
	academyManager2.save(function (err) {
		if (err) return console.log(err.message)
	})

	// TRAINERS -----------------------------------------------------------------------------
	const trainer1 = new models.Trainer({
		firstName: 'Jerzy',
		lastName: 'Pikulski',
		birthdayDate: '1975-02-19',
		nationality: 'Polska',
		academy: academy1,
		login: 'trainerlogin',
		password: 'Trainer1',
		email: 'pikul123@gmail.com',
	});
	trainer1.save(function (err) {
		if (err) return console.log(err.message);
	});

	const trainer2 = new models.Trainer({
		firstName: 'Wojciech',
		lastName: 'Agrest',
		birthdayDate: '1978-01-29',
		nationality: 'Polska',
		academy: academy1,
		login: 'wichnia123',
		password: 'wojtech',
		email: 'wojciech1@gmail.com',
	});
	trainer2.save(function (err) {
		if (err) return console.log(err.message);
	});

	const trainer3 = new models.Trainer({
		firstName: 'Paweł',
		lastName: 'Sokólski',
		birthdayDate: '1989-12-11',
		nationality: 'Polska',
		academy: academy1,
		password: 'sokol2',
		login: 'sokol22',
		email: 'sokol22@gmail.com',
	});
	trainer3.save(function (err) {
		if (err) return console.log(err.message);
	});

	const trainer4 = new models.Trainer({
		firstName: 'Piotr',
		lastName: 'Zajączkowski',
		birthdayDate: '1998-01-20',
		nationality: 'Polska',
		academy: academy1,
		login: 'piotrz',
		email: 'piotrz@gmail.com',
		password: 'piotrz'
	});
	trainer4.save(function (err) {
		if (err) return console.log(err.message);
	})

	const trainer5 = new models.Trainer({
		firstName: 'Jerzy',
		lastName: 'Górski',
		birthdayDate: '1986-01-21',
		nationality: 'Polska',
		academy: academy1,
		login: 'jerzyg',
		email: 'jerzyg@gmail.com',
		password: 'jerzyg123!'
	})
	trainer5.save(function (err) {
		if (err) return console.log(err.message);
	})
	// TEAMS -------------------------------------------------------------------------------------
	const team1 = new models.Team({
		teamName: 'Żak',
		trainer: trainer1,
		startYear: 2014,
		endYear: 2016,
		academy: academy1
	});
	team1.save(function (err) {
		if (err) return console.log(err.message);
	})

	const team2 = new models.Team({
		teamName: 'Orlik 1',
		trainer: trainer2,
		startYear: 2012,
		endYear: 2014,
		academy: academy1
	})
	team2.save(function (err) {
		if (err) return console.log(err.message);
	})

	const team3 = new models.Team({
		teamName: 'Orlik 2',
		trainer: trainer3,
		startYear: 2012,
		endYear: 2014,
		academy: academy1
	})
	team3.save(function (err) {
		if (err) return console.log(err.message);
	});

	const team4 = new models.Team({
		teamName: 'Młodzik',
		trainer: trainer4,
		startYear: 2010,
		endYear: 2012,
		academy: academy1
	});
	team4.save(function (err) {
		if (err) return console.log(err.message);
	});

	const team5 = new models.Team({
		teamName: 'Trampkarz',
		trainer: trainer4,
		startYear: 2008,
		endYear: 2010,
		academy: academy1
	})
	team5.save(function (err) {
		if (err) return console.log(err.message);
	})

	const team6 = new models.Team({
		teamName: 'Junior młodszy',
		trainer: trainer1,
		startYear: 2006,
		endYear: 2008,
		academy: academy1
	});
	team6.save(function (err) {
		if (err) return console.log(err.message);
	})

	const team7 = new models.Team({
		teamName: 'Junior starszy',
		trainer: trainer3,
		startYear: 2004,
		endYear: 2005,
		academy: academy1
	});
	team7.save(function (err) {
		if (err) return console.log(err.message);
	})

	// PARENTS ---------------------------------------------------------------------------------  
	const parent1 = new models.Parent({
		firstName: 'Jerzy',
		lastName: 'Kowalski',
		email: 'kowalj123@gmail.com',
		phoneNumber: '125 653 444',
		academy: academy1,
		login: 'parentlogin',
		password: 'Parent1'

	});
	parent1.save(function (err) {
		if (err) return console.log(err.message);
	});

	const parent2 = new models.Parent({
		firstName: 'Jan',
		lastName: 'Kapustka',
		email: 'kapucha123@gmail.com',
		phoneNumber: '125 653 444',
		academy: academy1,
		login: 'kapucha123',
		password: 'kapucha123'
	});
	parent2.save(function (err) {
		if (err) return console.log(err.message);
	});

	const parent3 = new models.Parent({
		firstName: 'Antoni',
		lastName: 'Wierzba',
		academy: academy1,
		login: 'awierczba3',
		email: 'awierczba3@gmail.com',
		password: 'awierczba3'
	});
	parent3.save(function (err) {
		if (err) return console.log(err.message);
	});

	const parent4 = new models.Parent({
		firstName: 'Mariusz',
		lastName: 'Gruszka',
		email: 'mgruszka@gmail.com',
		academy: academy1,
		login: 'mgruszka',
		password: 'mgruszka'
	});
	parent4.save(function (err) {
		if (err) return console.log(err.message);
	});

	// PLAYERS --------------------------------------------------------------------------------

	// player1-10 - team1 (żak)
	const player1 = new models.Player({
		firstName: 'Jerzy',
		lastName: 'Kowalski',
		birthdayDate: '2014-12-09',
		nationality: 'Polska',
		parent: parent1,
		team: team1,
		validityOfMedicalExaminations: '2023-02-19',
		academy: academy1
	});
	player1.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player2 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Kapustka',
		birthdayDate: '2015-11-09',
		nationality: 'Polska',
		parent: parent2,
		team: team1,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player2.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player3 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Wierzba',
		birthdayDate: '2014-01-19',
		nationality: 'Polska',
		parent: parent3,
		team: team1,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player3.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player4 = new models.Player({
		firstName: 'Wojciech',
		lastName: 'Gruszka',
		birthdayDate: '2016-01-19',
		nationality: 'Polska',
		team: team1,
		parent: parent4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player4.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player5 = new models.Player({
		firstName: 'Aleksander',
		lastName: 'Kowalski',
		birthdayDate: '2016-12-09',
		nationality: 'Polska',
		parent: parent2,
		team: team1,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player5.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player6 = new models.Player({
		firstName: 'Ignacy',
		lastName: 'Marchewka',
		birthdayDate: '2015-10-29',
		nationality: 'Polska',
		team: team1,
		validityOfMedicalExaminations: '2023-02-11',
		academy: academy1
	})
	player6.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player7 = new models.Player({
		firstName: 'Wiesław',
		lastName: 'Dobry',
		birthdayDate: '2015-03-29',
		nationality: 'Polska',
		team: team1,
		validityOfMedicalExaminations: '2024-02-11',
		academy: academy1
	})
	player7.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player8 = new models.Player({
		firstName: 'Piotr',
		lastName: 'Najlepszy',
		birthdayDate: '2016-05-12',
		nationality: 'Polska',
		team: team1,
		validityOfMedicalExaminations: '2023-05-11',
		academy: academy1
	})
	player8.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player9 = new models.Player({
		firstName: 'Tomasz',
		lastName: 'Kanapka',
		birthdayDate: '2014-10-14',
		nationality: 'Polska',
		team: team1,
		validityOfMedicalExaminations: '2023-02-18',
		academy: academy1
	})
	player9.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player10 = new models.Player({
		firstName: 'Lech',
		lastName: 'Rudy',
		birthdayDate: '2017-08-02',
		nationality: 'Polska',
		team: team1,
		validityOfMedicalExaminations: '2023-02-06',
		academy: academy1
	})
	player10.save(function (err) {
		if (err) return console.log(err.message);
	})

	// player11-21 - team2 (orlik1)
	const player11 = new models.Player({
		firstName: 'Wojciech',
		lastName: 'Nieszczęsny',
		birthdayDate: '2012-09-09',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2023-09-09',
		academy: academy1
	})
	player11.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player12 = new models.Player({
		firstName: 'Przemysław',
		lastName: 'Duży',
		birthdayDate: '2012-10-29',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2022-02-11',
		academy: academy1
	})
	player12.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player13 = new models.Player({
		firstName: 'Paweł',
		lastName: 'Grzyb',
		birthdayDate: '2012-10-09',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2022-09-09',
		academy: academy1
	})
	player13.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player14 = new models.Player({
		firstName: 'Noel',
		lastName: 'Whinson',
		birthdayDate: '2012-10-29',
		nationality: 'Great Britain',
		team: team2,
		validityOfMedicalExaminations: '2022-12-11',
		academy: academy1
	})
	player14.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player15 = new models.Player({
		firstName: 'Kamil',
		lastName: 'Łopata',
		birthdayDate: '2013-09-09',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2023-09-19',
		academy: academy1
	})
	player15.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player16 = new models.Player({
		firstName: 'Aleksander',
		lastName: 'Wiejka',
		birthdayDate: '2012-03-29',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2022-02-12',
		academy: academy1
	})
	player16.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player17 = new models.Player({
		firstName: 'Kamil',
		lastName: 'Łopata',
		birthdayDate: '2013-09-09',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2023-09-19',
		academy: academy1
	})
	player17.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player18 = new models.Player({
		firstName: 'Dominik',
		lastName: 'Fala',
		birthdayDate: '2013-02-21',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2022-02-15',
		academy: academy1
	})
	player18.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player19 = new models.Player({
		firstName: 'Piotr',
		lastName: 'Nosek',
		birthdayDate: '2014-09-09',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2022-09-19',
		academy: academy1
	})
	player19.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player20 = new models.Player({
		firstName: 'Krzysztof',
		lastName: 'Strzała',
		birthdayDate: '2014-03-29',
		nationality: 'Polska',
		team: team2,
		validityOfMedicalExaminations: '2022-12-11',
		academy: academy1
	})
	player20.save(function (err) {
		if (err) return console.log(err.message);
	})

	// player21-31 - team3 (orlik2)
	const player21 = new models.Player({
		firstName: 'Filip',
		lastName: 'Drań',
		birthdayDate: '2012-09-09',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2023-09-09',
		academy: academy1
	})
	player21.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player22 = new models.Player({
		firstName: 'Mirosław',
		lastName: 'Pomidor',
		birthdayDate: '2012-10-29',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2022-02-11',
		academy: academy1
	})
	player22.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player23 = new models.Player({
		firstName: 'Mateusz',
		lastName: 'Gotówka',
		birthdayDate: '2013-10-09',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2022-09-09',
		academy: academy1
	})
	player23.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player24 = new models.Player({
		firstName: 'Łukasz',
		lastName: 'Skorupka',
		birthdayDate: '2012-10-29',
		nationality: 'Great Britain',
		team: team3,
		validityOfMedicalExaminations: '2022-12-11',
		academy: academy1
	})
	player24.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player25 = new models.Player({
		firstName: 'Robert',
		lastName: 'Figura',
		birthdayDate: '2014-09-09',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2023-09-19',
		academy: academy1
	})
	player25.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player26 = new models.Player({
		firstName: 'Jerzy',
		lastName: 'Kapusta',
		birthdayDate: '2012-03-29',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2022-02-12',
		academy: academy1
	})
	player26.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player27 = new models.Player({
		firstName: 'Wiktor',
		lastName: 'Ucho',
		birthdayDate: '2013-09-09',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2023-09-19',
		academy: academy1
	})
	player27.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player28 = new models.Player({
		firstName: 'Tomasz',
		lastName: 'Gilon',
		birthdayDate: '2013-02-21',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2022-02-15',
		academy: academy1
	})
	player28.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player29 = new models.Player({
		firstName: 'Piotr',
		lastName: 'Naton',
		birthdayDate: '2012-09-09',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2022-09-19',
		academy: academy1
	})
	player29.save(function (err) {
		if (err) return console.log(err.message)
	})

	const player30 = new models.Player({
		firstName: 'Krzysztof',
		lastName: 'Razmowski',
		birthdayDate: '2014-03-29',
		nationality: 'Polska',
		team: team3,
		validityOfMedicalExaminations: '2022-12-11',
		academy: academy1
	})
	player30.save(function (err) {
		if (err) return console.log(err.message);
	})
	// player31-40 - team4 (młodzik)
	const player31 = new models.Player({
		firstName: 'Jan',
		lastName: 'Kowalski',
		birthdayDate: '2010-12-09',
		nationality: 'Polska',
		parent: parent1,
		team: team4,
		validityOfMedicalExaminations: '2023-02-19',
		academy: academy1
	});
	player31.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player32 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Kapustka',
		birthdayDate: '2010-11-09',
		nationality: 'Polska',
		parent: parent2,
		team: team4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player32.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player33 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Wierzba',
		birthdayDate: '2010-01-19',
		nationality: 'Polska',
		parent: parent3,
		team: team4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player33.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player34 = new models.Player({
		firstName: 'Wojciech',
		lastName: 'Gruszka',
		birthdayDate: '2011-01-19',
		nationality: 'Polska',
		team: team4,
		parent: parent4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player34.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player35 = new models.Player({
		firstName: 'Aleksander',
		lastName: 'Kowalski',
		birthdayDate: '2011-12-09',
		nationality: 'Polska',
		parent: parent2,
		team: team4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player35.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player36 = new models.Player({
		firstName: 'Ignacy',
		lastName: 'Marchewka',
		birthdayDate: '2011-10-29',
		nationality: 'Polska',
		team: team4,
		validityOfMedicalExaminations: '2023-02-11',
		academy: academy1
	})
	player36.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player37 = new models.Player({
		firstName: 'Wiesław',
		lastName: 'Dobry',
		birthdayDate: '2012-03-29',
		nationality: 'Polska',
		team: team4,
		validityOfMedicalExaminations: '2024-02-11',
		academy: academy1
	})
	player37.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player38 = new models.Player({
		firstName: 'Piotr',
		lastName: 'Najlepszy',
		birthdayDate: '2012-05-12',
		nationality: 'Polska',
		team: team4,
		validityOfMedicalExaminations: '2023-05-11',
		academy: academy1
	})
	player38.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player39 = new models.Player({
		firstName: 'Tomasz',
		lastName: 'Kanapka',
		birthdayDate: '2012-10-14',
		nationality: 'Polska',
		team: team4,
		validityOfMedicalExaminations: '2023-02-18',
		academy: academy1
	})
	player39.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player40 = new models.Player({
		firstName: 'Lech',
		lastName: 'Rudy',
		birthdayDate: '2012-08-02',
		nationality: 'Polska',
		team: team4,
		validityOfMedicalExaminations: '2023-02-06',
		academy: academy1
	})
	player40.save(function (err) {
		if (err) return console.log(err.message);
	})

	// player41-50 - team5 (trampkarz)
	const player41 = new models.Player({
		firstName: 'Michał',
		lastName: 'Nowacki',
		birthdayDate: '2008-12-09',
		nationality: 'Polska',
		parent: parent3,
		team: team5,
		validityOfMedicalExaminations: '2023-02-19',
		academy: academy1
	});
	player41.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player42 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Ergon',
		birthdayDate: '2010-11-09',
		nationality: 'Polska',
		parent: parent2,
		team: team5,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player42.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player43 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Wierzba',
		birthdayDate: '2009-01-19',
		nationality: 'Polska',
		parent: parent3,
		team: team5,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player43.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player44 = new models.Player({
		firstName: 'Wojciech',
		lastName: 'Tyboń',
		birthdayDate: '2009-01-19',
		nationality: 'Polska',
		team: team5,
		parent: parent4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player44.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player45 = new models.Player({
		firstName: 'Aleksander',
		lastName: 'Tancerz',
		birthdayDate: '2008-12-09',
		nationality: 'Polska',
		parent: parent2,
		team: team5,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player45.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player46 = new models.Player({
		firstName: 'Ignacy',
		lastName: 'Zły',
		birthdayDate: '2008-10-29',
		nationality: 'Polska',
		team: team5,
		validityOfMedicalExaminations: '2023-02-11',
		academy: academy1
	})
	player46.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player47 = new models.Player({
		firstName: 'Wiesław',
		lastName: 'Kot',
		birthdayDate: '2010-03-29',
		nationality: 'Polska',
		team: team5,
		validityOfMedicalExaminations: '2024-02-11',
		academy: academy1
	})
	player47.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player48 = new models.Player({
		firstName: 'Piotr',
		lastName: 'Pies',
		birthdayDate: '2010-05-12',
		nationality: 'Polska',
		team: team5,
		validityOfMedicalExaminations: '2023-05-11',
		academy: academy1
	})
	player48.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player49 = new models.Player({
		firstName: 'Tomasz',
		lastName: 'Drewno',
		birthdayDate: '2010-10-14',
		nationality: 'Polska',
		team: team5,
		validityOfMedicalExaminations: '2023-02-18',
		academy: academy1
	})
	player49.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player50 = new models.Player({
		firstName: 'Lech',
		lastName: 'Kurztoń',
		birthdayDate: '2010-08-02',
		nationality: 'Polska',
		team: team5,
		validityOfMedicalExaminations: '2023-02-06',
		academy: academy1
	})
	player50.save(function (err) {
		if (err) return console.log(err.message);
	})

	// player51-60 - team6 (junior młodszy)
	const player51 = new models.Player({
		firstName: 'Michał',
		lastName: 'Możny',
		birthdayDate: '2008-12-09',
		nationality: 'Polska',
		parent: parent4,
		team: team6,
		validityOfMedicalExaminations: '2023-02-19',
		academy: academy1
	});
	player51.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player52 = new models.Player({
		firstName: 'Henryk',
		lastName: 'Abecadło',
		birthdayDate: '2007-11-09',
		nationality: 'Polska',
		parent: parent2,
		team: team6,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player52.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player53 = new models.Player({
		firstName: 'Piotr',
		lastName: 'Wierzba',
		birthdayDate: '2006-01-19',
		nationality: 'Polska',
		parent: parent3,
		team: team6,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player53.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player54 = new models.Player({
		firstName: 'Szymon',
		lastName: 'Tekień',
		birthdayDate: '2006-01-19',
		nationality: 'Polska',
		team: team6,
		parent: parent4,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player54.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player55 = new models.Player({
		firstName: 'Sebastian',
		lastName: 'Romanowski',
		birthdayDate: '2008-12-09',
		nationality: 'Polska',
		parent: parent2,
		team: team6,
		validityOfMedicalExaminations: '2022-12-09',
		academy: academy1
	});
	player55.save(function (err) {
		if (err) return console.log(err.message);
	});

	const player56 = new models.Player({
		firstName: 'Ignacy',
		lastName: 'Trąbka',
		birthdayDate: '2008-10-29',
		nationality: 'Polska',
		team: team6,
		validityOfMedicalExaminations: '2023-02-11',
		academy: academy1
	})
	player56.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player57 = new models.Player({
		firstName: 'Jakub',
		lastName: 'Puzon',
		birthdayDate: '2007-03-29',
		nationality: 'Polska',
		team: team6,
		validityOfMedicalExaminations: '2024-02-11',
		academy: academy1
	})
	player57.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player58 = new models.Player({
		firstName: 'Łukasz',
		lastName: 'Miska',
		birthdayDate: '2007-05-12',
		nationality: 'Polska',
		team: team6,
		validityOfMedicalExaminations: '2023-05-11',
		academy: academy1
	})
	player58.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player59 = new models.Player({
		firstName: 'Tomasz',
		lastName: 'Konik',
		birthdayDate: '2007-10-14',
		nationality: 'Polska',
		team: team6,
		validityOfMedicalExaminations: '2023-02-18',
		academy: academy1
	})
	player59.save(function (err) {
		if (err) return console.log(err.message);
	})

	const player60 = new models.Player({
		firstName: 'Aleksander',
		lastName: 'Kurztoń',
		birthdayDate: '2006-08-02',
		nationality: 'Polska',
		team: team6,
		validityOfMedicalExaminations: '2023-02-06',
		academy: academy1
	})
	player60.save(function (err) {
		if (err) return console.log(err.message);
	})

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
		date: new Date('2022-11-05 10:30:00'),
		sportsFacility: sportsFacility2
	})
	match1.save(function (err) {
		if (err) return console.log(err.message);
	})

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
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic2.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic3 = new models.MatchStatistic({
		player: player3,
		match: match1,
		minutesPlayed: 89,
		remarks: 'Doznał kontuzji prawego kolana',
		attendance: true
	});
	matchStatistic3.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic4 = new models.MatchStatistic({
		player: player5,
		match: match1,
		goalsScored: 2,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic4.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic5 = new models.MatchStatistic({
		player: player5,
		match: match1,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic5.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic6 = new models.MatchStatistic({
		player: player6,
		match: match1,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic6.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic7 = new models.MatchStatistic({
		player: player7,
		match: match1,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic7.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic8 = new models.MatchStatistic({
		player: player8,
		match: match1,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic8.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic9 = new models.MatchStatistic({
		player: player9,
		match: match1,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic9.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic10 = new models.MatchStatistic({
		player: player10,
		match: match1,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic10.save(function (err) {
		if (err) return console.log(err.message);
	})
// ---------------------------------------------------------------------
	const match2 = new models.Match({
		team: team1,
		goalsConceded: 5,
		goalsScored: 1,
		opponent: 'Korona Kielce',
		date: new Date('2022-11-13 13:00:00'),
		sportsFacility: sportsFacility3
	})
	match2.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic11 = new models.MatchStatistic({
		player: player1,
		match: match2,
		goalsScored: 1,
		yellowCards: 1,
		minutesPlayed: 67,
		attendance: true
	});
	matchStatistic11.save(function (err) {
		if (err) return console.log(err.message);
	});
	const matchStatistic12 = new models.MatchStatistic({
		player: player2,
		match: match2,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic12.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic13 = new models.MatchStatistic({
		player: player3,
		match: match2,
		minutesPlayed: 89,
		remarks: 'Doznał kontuzji prawego kolana',
		attendance: true
	});
	matchStatistic13.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic14 = new models.MatchStatistic({
		player: player4,
		match: match2,
		goalsScored: 2,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic14.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic15 = new models.MatchStatistic({
		player: player5,
		match: match2,
		goalsScored: 2,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic15.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic16 = new models.MatchStatistic({
		player: player6,
		match: match2,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic16.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic17 = new models.MatchStatistic({
		player: player7,
		match: match2,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic17.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic18 = new models.MatchStatistic({
		player: player8,
		match: match2,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic18.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic19 = new models.MatchStatistic({
		player: player9,
		match: match2,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic19.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic20 = new models.MatchStatistic({
		player: player10,
		match: match2,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic20.save(function (err) {
		if (err) return console.log(err.message);
	})

	// ---------------------------------------------------------------------
	const match3 = new models.Match({
		team: team2,
		goalsConceded: 5,
		goalsScored: 4,
		opponent: 'Lechia Gdańsk',
		date: new Date('2022-11-20 11:00:00'),
		sportsFacility: sportsFacility3
	})
	match3.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic21 = new models.MatchStatistic({
		player: player11,
		match: match3,
		goalsScored: 1,
		yellowCards: 1,
		minutesPlayed: 87,
		attendance: true
	});
	matchStatistic21.save(function (err) {
		if (err) return console.log(err.message);
	});
	const matchStatistic22 = new models.MatchStatistic({
		player: player12,
		match: match3,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic22.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic23 = new models.MatchStatistic({
		player: player13,
		match: match3,
		minutesPlayed: 89,
		remarks: 'Doznał kontuzji prawego kolana',
		attendance: true
	});
	matchStatistic23.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic24 = new models.MatchStatistic({
		player: player14,
		match: match3,
		goalsScored: 2,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic24.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic25 = new models.MatchStatistic({
		player: player15,
		match: match3,
		goalsScored: 2,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic25.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic26 = new models.MatchStatistic({
		player: player16,
		match: match3,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 0,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic26.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic27 = new models.MatchStatistic({
		player: player17,
		match: match3,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 57,
		attendance: true
	});
	matchStatistic27.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic28 = new models.MatchStatistic({
		player: player18,
		match: match3,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic28.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic29 = new models.MatchStatistic({
		player: player19,
		match: match3,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic29.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic30 = new models.MatchStatistic({
		player: player20,
		match: match3,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic30.save(function (err) {
		if (err) return console.log(err.message);
	})

	//------------------------------------------------
	const match4 = new models.Match({
		team: team2,
		goalsConceded: 2,
		goalsScored: 1,
		opponent: 'Lechia Gdańsk',
		date: new Date('2022-11-26 13:00:00'),
		sportsFacility: sportsFacility1
	})
	match4.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic31 = new models.MatchStatistic({
		player: player11,
		match: match4,
		goalsScored: 1,
		yellowCards: 1,
		minutesPlayed: 87,
		attendance: true
	});
	matchStatistic31.save(function (err) {
		if (err) return console.log(err.message);
	});
	const matchStatistic32 = new models.MatchStatistic({
		player: player12,
		match: match4,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic32.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic33 = new models.MatchStatistic({
		player: player13,
		match: match4,
		minutesPlayed: 89,
		attendance: true
	});
	matchStatistic33.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic34 = new models.MatchStatistic({
		player: player14,
		match: match4,
		goalsScored: 2,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic34.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic35 = new models.MatchStatistic({
		player: player15,
		match: match4,
		attendance: false
	});
	matchStatistic35.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic36 = new models.MatchStatistic({
		player: player16,
		match: match4,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 0,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic36.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic37 = new models.MatchStatistic({
		player: player17,
		match: match4,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 57,
		attendance: true
	});
	matchStatistic37.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic38 = new models.MatchStatistic({
		player: player18,
		match: match4,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic38.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic39 = new models.MatchStatistic({
		player: player19,
		match: match4,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic39.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic40 = new models.MatchStatistic({
		player: player20,
		match: match4,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic40.save(function (err) {
		if (err) return console.log(err.message);
	})

	//------------------------------------------------

	const match5 = new models.Match({
		team: team3,
		goalsConceded: 2,
		goalsScored: 1,
		opponent: 'Śląsk Wrocław',
		date: new Date('2022-11-15 13:00:00'),
		sportsFacility: sportsFacility1
	});
	match5.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic51 = new models.MatchStatistic({
		player: player21,
		match: match5,
		yellowCards: 1,
		minutesPlayed: 87,
		attendance: true
	});
	matchStatistic51.save(function (err) {
		if (err) return console.log(err.message);
	});
	const matchStatistic52 = new models.MatchStatistic({
		player: player22,
		match: match5,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic52.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic53 = new models.MatchStatistic({
		player: player23,
		match: match5,
		minutesPlayed: 89,
		attendance: true
	});
	matchStatistic53.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic54 = new models.MatchStatistic({
		player: player24,
		match: match5,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic54.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic55 = new models.MatchStatistic({
		player: player25,
		goalsScored: 1,
		match: match5,
		attendance: false
	});
	matchStatistic55.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic56 = new models.MatchStatistic({
		player: player26,
		match: match5,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 0,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic56.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic57 = new models.MatchStatistic({
		player: player27,
		match: match5,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 57,
		attendance: true
	});
	matchStatistic57.save(function (err) {
		if (err) return console.log(err.message);
	})

	const matchStatistic58 = new models.MatchStatistic({
		player: player28,
		match: match5,
		goalsScored: 0,
		minutesPlayed: 90,
		attendance: true
	});
	matchStatistic58.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic59 = new models.MatchStatistic({
		player: player29,
		match: match5,
		goalsScored: 0,
		yellowCards: 2,
		redCaers: 1,
		minutesPlayed: 90,
		attendance: true
	})
	matchStatistic59.save(function (err) {
		if (err) return console.log(err.message);
	})
	const matchStatistic50 = new models.MatchStatistic({
		player: player30,
		match: match5,
		goalsScored: 0,
		yellowCards: 1,
		minutesPlayed: 77,
		attendance: true
	});
	matchStatistic50.save(function (err) {
		if (err) return console.log(err.message);
	})

	//------------------------------------------------

	const match6 = new models.Match({
		team: team1,
		opponent: 'Legia Warszawa',
		date: new Date('2022-12-04 10:30:00'),
		sportsFacility: sportsFacility2
	})
	match6.save(function (err) {
		if (err) return console.log(err.message);
	})

	const match7 = new models.Match({
		team: team1,
		opponent: 'Korona Kielce',
		date: new Date('2022-12-11 13:00:00'),
		sportsFacility: sportsFacility3
	})
	match7.save(function (err) {
		if (err) return console.log(err.message);
	})

	const match8 = new models.Match({
		team: team1,
		opponent: 'Lechia Gdańsk',
		date: new Date('2022-12-19 11:00:00'),
		sportsFacility: sportsFacility3
	})
	match8.save(function (err) {
		if (err) return console.log(err.message);
	})

	const match9 = new models.Match({
		team: team4,
		opponent: 'Lechia Gdańsk',
		date: new Date('2022-12-14 13:00:00'),
		sportsFacility: sportsFacility1
	});
	match9.save(function (err) {
		if (err) return console.log(err.message);
	});

	const match10 = new models.Match({
		team: team4,
		opponent: 'Śląsk Wrocław',
		date: new Date('2022-12-18 13:00:00'),
		sportsFacility: sportsFacility1
	});
	match10.save(function (err) {
		if (err) return console.log(err.message);
	})
	

	// TOURNAMENTS ----------------------------------------------------------------------------
	const tournament1 = new models.Tournament({
		tournamentName: 'Towarzyski turniej "KopaninaCup"',
		startDate: new Date("2022, 11, 13"),
		endDate: new Date("2022, 11, 15"),
		sportsFacility: sportsFacility3,
		friendly: true,
		team: team1
	})
	tournament1.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic1 = new models.TournamentStatistic({
		player: player1,
		tournament: tournament1,
		goalsScored: 1,
		yellowCards: 1,
		minutesPlayed: 113,
		attendance: true
	})
	tournamentStatistic1.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic2 = new models.TournamentStatistic({
		player: player2,
		tournament: tournament1,
		goalsScored: 3,
		minutesPlayed: 90,
		attendance: true
	})
	tournamentStatistic2.save(function (err) {
		if (err) return console.log(err.message);
	})
	
	const tournamentStatistic3 = new models.TournamentStatistic({
		player: player3,
		tournament: tournament1,
		minutesPlayed: 89,
		remarks: 'Doznał kontuzji prawego kolana',
		attendance: true
	})
	tournamentStatistic3.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic4 = new models.TournamentStatistic({
		player: player4,
		tournament: tournament1,
		goalsScored: 0,
		minutesPlayed: 80,
	})
	tournamentStatistic4.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic5 = new models.TournamentStatistic({
		player: player5,
		tournament: tournament1,
		goalsScored: 1,
		yellowCards: 1,
		minutesPlayed: 167,
		attendance: true
	})
	tournamentStatistic5.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic6 = new models.TournamentStatistic({
		player: player6,
		tournament: tournament1,
		goalsScored: 3,
		minutesPlayed: 90,
		attendance: true
	})
	tournamentStatistic6.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic7 = new models.TournamentStatistic({
		player: player7,
		tournament: tournament1,
		minutesPlayed: 189,
		remarks: 'Doznał kontuzji prawego kolana',
		attendance: true
	})
	tournamentStatistic7.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic8 = new models.TournamentStatistic({
		player: player8,
		tournament: tournament1,
		goalsScored: 0,
		minutesPlayed: 190,
		remarks: 'Zdobył miano zawodnika turnieju',
	})
	tournamentStatistic8.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic9 = new models.TournamentStatistic({
		player: player9,
		tournament: tournament1,
		minutesPlayed: 189,
		remarks: 'Doznał kontuzji prawego kolana',
		attendance: true
	})
	tournamentStatistic9.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournamentStatistic10 = new models.TournamentStatistic({
		player: player10,
		tournament: tournament1,
		goalsScored: 0,
		minutesPlayed: 190,
		remarks: 'Król strzelców turnieju',
	})
	tournamentStatistic10.save(function (err) {
		if (err) return console.log(err.message);
	})

	//---------------------------------------------------------------------------

	const tournament2 = new models.Tournament({
		tournamentName: 'Turniej Mikołajkowy',
		startDate: new Date('2022-12-21 10:05:00'),
		endDate: new Date('2022-12-23 19:00:00'),
		sportsFacility: sportsFacility3,
		friendly: false,
		team: team4
	})
	tournament2.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournament3 = new models.Tournament({
		tournamentName: 'Turniej o Puchar Burmistrza Goniądza',
		startDate: new Date('2022-11-02 10:05:00'),
		endDate: new Date('2022-11-03 19:00:00'),
		sportsFacility: sportsFacility4,
		friendly: false,
		team: team4
	})
	tournament3.save(function (err) {
		if (err) return console.log(err.message);
	})

	const tournament4 = new models.Tournament({
		tournamentName: 'Turniej o Puchar Burmistrza Goniądza',
		startDate: new Date('2022-12-05 10:05:00'),
		endDate: new Date('2022-12-06 19:00:00'),
		sportsFacility: sportsFacility1,
		friendly: false,
		team: team5
	})
	tournament4.save(function (err) {
		if (err) return console.log(err.message);
	})

	// ----------------------------------------------------------------------------
	
	// TRAININGS ----------------------------------------------------------------------------
	const training1 = new models.Training({
		date: new Date('2022-11-01 15:30'),
		sportsFacility: sportsFacility1,
		team: team1,
	})
	training1.save(function (err) {
		if (err) return console.log(err.message);
	})

	const attendaceList1 = new models.AttendanceList({
		player: player1,
		training: training1,
		attendance: true,
	})
	attendaceList1.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList2 = new models.AttendanceList({
		player: player2,
		training: training1,
		attendance: true,
	})
	attendaceList2.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList3 = new models.AttendanceList({
		player: player3,
		training: training1,
		attendance: true,
	})
	attendaceList3.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList4 = new models.AttendanceList({
		player: player4,
		training: training1,
		remarks: 'Nieobecność zgłoszona wcześniej',
	})
	attendaceList4.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList5 = new models.AttendanceList({
		player: player5,
		training: training1,
		attendance: true,
	})
	attendaceList5.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList6 = new models.AttendanceList({
		player: player6,
		training: training1,
		attendance: true,
	})
	attendaceList6.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList7 = new models.AttendanceList({
		player: player7,
		training: training1,
		attendance: true,
	})
	attendaceList7.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList8 = new models.AttendanceList({
		player: player8,
		training: training1,
		attendance: true,
	})
	attendaceList8.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList9 = new models.AttendanceList({
		player: player9,
		training: training1,
		remarks: 'Nieobecność zgłoszona wcześniej',
	})
	attendaceList9.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList10 = new models.AttendanceList({
		player: player10,
		training: training1,
		attendance: true,
	})
	attendaceList10.save(function (err) {
		if (err) return console.log(err.message)
	})

	// -----------------------------------------------------------------

	const training2 = new models.Training({
		date: new Date('2022-11-10 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training2.save(function (err) {
		if (err) return console.log(err.message);
	})

	const attendaceList11 = new models.AttendanceList({
		player: player1,
		training: training2,
		attendance: true,
	})
	attendaceList11.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList12 = new models.AttendanceList({
		player: player2,
		training: training2,
		attendance: true,
	})
	attendaceList12.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList13 = new models.AttendanceList({
		player: player2,
		training: training1,
	})
	attendaceList13.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList14 = new models.AttendanceList({
		player: player4,
		training: training2,
		attendance: true,
	})
	attendaceList14.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList15 = new models.AttendanceList({
		player: player5,
		training: training2,
		attendance: true,
	})
	attendaceList15.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList16 = new models.AttendanceList({
		player: player6,
		training: training2,
	})
	attendaceList16.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList17 = new models.AttendanceList({
		player: player7,
		training: training2,
		attendance: true,
	})
	attendaceList17.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList18 = new models.AttendanceList({
		player: player8,
		training: training2,
		attendance: true,
	})
	attendaceList18.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList19 = new models.AttendanceList({
		player: player9,
		training: training2,
	})
	attendaceList19.save(function (err) {
		if (err) return console.log(err.message)
	})

	const attendaceList20 = new models.AttendanceList({
		player: player10,
		training: training2,
	})
	attendaceList20.save(function (err) {
		if (err) return console.log(err.message)
	})

	// -----------------------------------------------------------------

	const training3 = new models.Training({
		date: new Date('2022-11-15 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training3.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training4 = new models.Training({
		date: new Date('2022-11-24 17:05'),
		sportsFacility: sportsFacility1,
		team: team5
	})
	training4.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training5 = new models.Training({
		date: new Date('2022-11-04 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training5.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training6 = new models.Training({
		date: new Date('2022-11-18 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training6.save(function (err) {
		if (err) return console.log(err.message);
	})


	const training7 = new models.Training({
		date: new Date('2022-12-01 15:30'),
		sportsFacility: sportsFacility1,
		team: team1,
	})
	training7.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training8 = new models.Training({
		date: new Date('2022-12-08 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training8.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training9 = new models.Training({
		date: new Date('2022-12-15 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training9.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training10 = new models.Training({
		date: new Date('2022-12-22 17:05'),
		sportsFacility: sportsFacility1,
		team: team5
	})
	training10.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training11 = new models.Training({
		date: new Date('2022-12-06 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training11.save(function (err) {
		if (err) return console.log(err.message);
	})

	const training12 = new models.Training({
		date: new Date('2022-12-20 17:05'),
		sportsFacility: sportsFacility1,
		team: team1
	})
	training12.save(function (err) {
		if (err) return console.log(err.message);
	})

	return { ok: true }
}
