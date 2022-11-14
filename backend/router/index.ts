import express from 'express'
import { seedDatabase } from '../database/seed'
import models from '../database/models'

import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Trainer } from 'backend/database/schemas/Trainer.user'
import { Player } from 'backend/database/schemas/Player'
import { Parent } from 'backend/database/schemas/Parent.user'
import { Match } from 'backend/database/schemas/Match'
import { Team } from 'backend/database/schemas/Team'

import useAuthRoutes from './auth'

const router = express.Router()

useAuthRoutes(router)

export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})

router.post('/academy', async (req, res) => {
    try {
        const academy = new models.Academy({ academyName: req.body.academyName });
        academy.save(function (err) {
            if (err) {
                console.log(err.message)
                res.status(400).send(err)
            } 
            else res.send(academy)
        })
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/managers', async (req, res) => {
    try {
        const academyManager = await models.AcademyManager.find()
        res.send(academyManager)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/academies', async (req, res) => {
    try {
        const academies = await models.Academy.find()
        res.send(academies)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/managers', async (req, res) => {
    try {
        const academies = await models.AcademyManager.find()
        .populate({
            path: 'academy',
            model: 'Academy',
        })
        res.send(academies)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/manager/:id', async (req, res) => {
    try {
        const academyManager = await models.AcademyManager.findById(req.params.id)
        res.send(academyManager)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/manager/:id', async (req, res) => {
    try {
        const manager = await models.AcademyManager.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdayDate: req.body.birthdayDate,
                nationality: req.body.nationality,
                remarks: req.body.remarks,
                academy: req.body.academy,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
            },
            {
                new: true
            }
        )
        res.send(manager)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/academy/:id', async (req, res) => {
    try {
        const academy = await models.Academy.findById(req.params.id)
        res.send(academy)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/players/academy/:id', async (req, res) => {
    try {
        const players = await models.Player.find()
        .sort({ lastName: 1, firstName: 1 })
        .populate('parent')
        .populate({
            path: 'team',
            model: 'Team',
        })
        .populate({
            path: 'academy',
            model: 'Academy',
            match: { _id: req.params.id }
        }) as Player[]

    res.send(players.filter(item => item.academy != null))
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/players/team/:team', async (req, res) => {
    try {
        const players = await models.Player.find()
            .sort({ lastName: 1, firstName: 1 })
            .populate('parent')
            .populate({
                path: 'team',
                model: 'Team',
                match: { _id: req.params.team },
            }) as Player[]

        res.send(players.filter(item => (item.team != null)))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/player/:id', async (req, res) => {
    try {
        const player = await models.Player.findById(req.params.id)
            .populate('parent')
            .populate({
                path: 'team',
                model: 'Team',
            })
        res.send(player)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/player', async (req, res) => {
    try {
        const player = models.Player.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(player)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})


router.post('/player/:id', async (req, res) => {
    try {
        const player = await models.Player.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdayDate: req.body.birthdayDate,
                nationality: req.body.nationality,
                remarks: req.body.remarks,
                validityOfMedicalExaminations: req.body.validityOfMedicalExaminations,
                team: req.body.team,
                parent: req.body.parent,
            },
            {
                new: true
            }
        )
        res.send(player)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/player/:id', async (req, res) => {
    try {
        const player = await models.Player.findOneAndDelete({ _id: req.params.id })
        res.send(player)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/parents/academy/:id', async (req, res) => {
    try {
        const parents = await models.Parent.find()
        .sort({ lastName: 1, firstName: 1 })
        .populate({
            path: 'academy',
            model: 'Academy',
            match: { _id: req.params.id }
        }) as Parent[]

    res.send(parents.filter(item => item.academy != null))

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/parent/:id', async (req, res) => {
    try {
        const parent = await models.Parent.findById(req.params.id)

        res.send(parent)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/parent', async (req, res) => {
    try {
        const parent = models.Parent.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(parent)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/parent/:id', async (req, res) => {
    try {
        const parent = await models.Parent.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                remarks: req.body.remarks,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                academy: req.body.academy,
            },
            {
                new: true
            }
        )
        res.send(parent)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/parent/:id', async (req, res) => {
    try {
        const parent = await models.Parent.findOneAndDelete({ _id: req.params.id })
        res.send(parent)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/trainers/academy/:id', async (req, res) => {
    try {
        const trainer = await models.Trainer.find()
            .sort({ lastName: 1, firstName: 1 })
            .populate({
                path: 'academy',
                model: 'Academy',
                match: { id: req.params.id }
            }) as Trainer[]

        res.send(trainer.filter(item => item.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/trainer/:id', async (req, res) => {
    try {
        const trainer = await models.Trainer.findById(req.params.id)
        res.send(trainer)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/trainer', async (req, res) => {
    try {
        const trainer = models.Trainer.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(trainer)
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/trainer/:id', async (req, res) => {
    try {
        const trainer = await models.Trainer.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdayDate: req.body.birthdayDate,
                nationality: req.body.nationality,
                remarks: req.body.remarks,
                academy: req.body.academy,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
            },
            {
                new: true
            }
        )
        res.send(trainer)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/trainer/:id', async (req, res) => {
    try {
        const trainer = await models.Trainer.findOneAndDelete({ _id: req.params.id })
        res.send(trainer)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/sportsfacilities/academy/:id', async (req, res) => {
    try {
        const sportsFacilities = await models.SportsFacility.find()
            .sort({ name: 1 })
            .populate({
                path: 'academy',
                model: 'Academy',
                match: { id: req.params.id }
            }) as SportsFacility[]

        res.send(sportsFacilities.filter(item => item.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.get('/sportsFacility/:id', async (req, res) => {
    try {
        const sportsFacility = await models.SportsFacility.findById(req.params.id)

        res.send(sportsFacility)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/sportsFacility', async (req, res) => {
    try {
        const sportsFacility = models.SportsFacility.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(sportsFacility)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/sportsFacility/:id', async (req, res) => {
    try {
        const sportsFacility = await models.SportsFacility.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                name: req.body.name,
                academy: req.body.academy,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                postalCode: req.body.postalCode,
                city: req.body.city,
            },
            {
                new: true
            }
        )
        res.send(sportsFacility)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/sportsFacility/:id', async (req, res) => {
    try {
        const sportsFacility = await models.SportsFacility.findOneAndDelete({ _id: req.params.id })
        res.send(sportsFacility)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/teams/academy/:id', async (req, res) => {
    try {
        const teams = await models.Team.find()
            .sort({ teamName: 1 })
            .populate({
                path: 'trainer',
                model: 'Trainer',
            })
            .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: req.params.id }
            }) as Team[]

            res.send(teams.filter(item => item.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/team/:id', async (req, res) => {
    try {
        const team = await models.Team.findById(req.params.id)
            .populate({
                path: 'trainer',
                model: 'Trainer',
            })
        res.send(team)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/team', async (req, res) => {
    try {
        const team = models.Team.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(team)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/team/:id', async (req, res) => {
    try {
        const team = await models.Team.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                teamName: req.body.teamName,
                startYear: req.body.startYear,
                endYear: req.body.endYear,
                trainer: req.body.trainer,
            },
            {
                new: true
            }
        )
        res.send(team)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/team/:id', async (req, res) => {
    try {
        const team = await models.Team.findOneAndDelete({ _id: req.params.id })
        res.send(team)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/matches/:academy', async (req, res) => {
    try {
        const matches = await models.Match.find()
            .populate('sportsFacility')
            .populate({
                path: 'team',
                model: 'Team',
                populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { name: req.params.academy }
                }
            }) as Match[]

        res.send(matches.filter(item => item.team.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/matches/team/:team', async (req, res) => {
    try {
        const matches = await models.Match.find()
            .populate('sportsFacility')
            .populate({
                path: 'team',
                model: 'Team',
                match: { _id: req.params.team }
            }) as Match[]

        res.send(matches.filter(item => item.team != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/match/:id', async (req, res) => {
    try {
        const match = await models.Match.findById(req.params.id)
            .populate('sportsFacility')
            .populate({
                path: 'team',
                model: 'Team',
            }) as Match[]

        res.send(match)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/match', async (req, res) => {
    try {
        const match = models.Match.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(match)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/match/:id', async (req, res) => {
    try {
        const match = await models.Match.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                goalsScored: req.body.goalsScored,
                goalsConceded: req.body.goalsConceded,
                opponent: req.body.opponent,
                date: req.body.date,
                team: req.body.team,
                friendly: req.body.friendly,
                sportsFacility: req.body.sportsFacility,
                remarks: req.body.remarks,
                duration: req.body.duration,
            },
            {
                new: true
            }
        )
        res.send(match)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/match/:id', async (req, res) => {
    try {
        const match = await models.Match.findOneAndDelete({ _id: req.params.id })
        res.send(match)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/trainings/:academy', async (req, res) => {
    try {
        const trainings = await models.Training.find()
            .populate({
                path: 'sportsFacility',
                model: 'SportsFacility'
            })
            .populate({
                path: 'team',
                model: 'Team',
                populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { name: req.params.academy }
                }
            }) as Training[]
        res.send(trainings.filter(item => item.team.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/trainings/team/:team', async (req, res) => {
    try {
        const trainings = await models.Training.find()
            .populate({
                path: 'sportsFacility',
                model: 'SportsFacility'
            })
            .populate({
                path: 'team',
                model: 'Team',
                match: { _id: req.params.team }
            }) as Training[]
        res.send(trainings.filter(item => item.team != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/training/:id', async (req, res) => {
    try {
        const training = await models.Training.findById(req.params.id)
            .populate('sportsFacility')
            .populate({
                path: 'team',
                model: 'Team',
            }) as Training[]

        res.send(training)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/training', async (req, res) => {
    try {
        const training = models.Training.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(training)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/training/:id', async (req, res) => {
    try {
        const training = await models.Training.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                date: req.body.date,
                team: req.body.team,
                sportsFacility: req.body.sportsFacility,
                remarks: req.body.remarks,
            },
            {
                new: true
            }
        )
        res.send(training)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/training/:id', async (req, res) => {
    try {
        const training = await models.Training.findOneAndDelete({ _id: req.params.id })
        res.send(training)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tournaments/:academy', async (req, res) => {
    try {
        const tournaments = await models.Tournament.find()
            .populate({
                path: 'sportsFacility',
                model: 'SportsFacility'
            })
            .populate({
                path: 'team',
                model: 'Team',
                populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { name: req.params.academy }
                }
            }) as Tournament[]
        res.send(tournaments.filter(item => item.team.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tournaments/team/:team', async (req, res) => {
    try {
        const tournaments = await models.Tournament.find()
            .populate({
                path: 'sportsFacility',
                model: 'SportsFacility'
            })
            .populate({
                path: 'team',
                model: 'Team',
                match: { _id: req.params.team }
            }) as Tournament[]
        res.send(tournaments.filter(item => item.team != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tournament/:id', async (req, res) => {
    try {
        const tournament = await models.Tournament.findById(req.params.id)
            .populate('sportsFacility')
            .populate({
                path: 'team',
                model: 'Team',
            }) as Tournament[]

        res.send(tournament)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/tournament', async (req, res) => {
    try {
        const tournament = models.Tournament.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(tournament)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/tournament/:id', async (req, res) => {
    console.log('update tournament')
    try {
        const tournament = await models.Tournament.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                tournamentName: req.body.tournamentName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                team: req.body.team,
                friendly: req.body.friendly,
                sportsFacility: req.body.sportsFacility,
                remarks: req.body.remarks,
            },
            {
                new: true
            }
        )
        res.send(tournament)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tournament/:id', async (req, res) => {
    try {
        const tournament = await models.Tournament.findOneAndDelete({ _id: req.params.id })
        res.send(tournament)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/attendanceLists/training/:id', async (req, res) => {
    try {
        const attendaceList = await models.AttendanceList.find({ training: req.params.id })
            .populate({
                path: 'player',
                model: 'Player',
            }) as AttendanceList[]

        res.send(attendaceList.filter(item => item.training != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/attendanceList/team/:id', async (req, res) => {
    try {
        const attendanceList = await models.AttendanceList.find()
            .populate({
                path: 'player',
                model: 'Player'
            })
            .populate({
                path: 'training',
                model: 'Training',
                populate: {
                    path: 'team',
                    model: 'Team',
                    match: { _id: req.params.id }
                }
            }) as AttendanceList[]

        res.send(attendanceList.filter(item => item.training != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/attendanceLists/academy/:id', async (req, res) => {
    try {
        const attendanceList = await models.AttendanceList.find()
            .populate({
                path: 'player',
                model: 'Player'
            })
            .populate({
                path: 'training',
                model: 'Training',
                populate: {
                    path: 'team',
                    model: 'Team',
                    populate: {
                        path: 'academy',
                        model: 'Academy',
                        match: { _id: req.params.id }
                    }
                }
            }) as AttendanceList[]
        res.send(attendanceList.filter(item => item.training.team.academy != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/attendanceList', async (req, res) => {
    try {
        const attendanceList = models.AttendanceList.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(attendanceList)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/attendanceList/:id', async (req, res) => {
    try {
        const attendanceList = await models.AttendanceList.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                attendance: req.body.attendance,
                remarks: req.body.remarks,
            },
            {
                new: true
            }
        )
        res.send(attendanceList)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/attendanceList/:id', async (req, res) => {
    try {
        const attendanceList = await models.AttendanceList.deleteMany({ training: req.params.id })
        console.log(attendanceList.deletedCount)
        res.send(attendanceList)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/matchStatistic/match/:id', async (req, res) => {
    try {
        const matchStatistic = await models.MatchStatistic.find({ match: req.params.id })
            .populate({
                path: 'player',
                model: 'Player',
            }) as MatchStatistic[]

        res.send(matchStatistic.filter(item => item.match != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/matchStatistics/team/:id', async (req, res) => {
    try {
        const matchStatistic = await models.MatchStatistic.find()
            .populate({
                path: 'player',
                model: 'Player'
            })
            .populate({
                path: 'match',
                model: 'Match',
                populate: {
                    path: 'team',
                    model: 'Team',
                    match: { _id: req.params.id }
                }
            }) as MatchStatistic[]

        res.send(matchStatistic.filter(item => item.match != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/matchStatistics/academy/:id', async (req, res) => {
    try {
        const matchStatistic = await models.MatchStatistic.find()
            .populate({
                path: 'player',
                model: 'Player'
            })
            .populate({
                path: 'match',
                model: 'Match',
                populate: {
                    path: 'team',
                    model: 'Team',
                    populate: {
                        path: 'academy',
                        model: 'Academy',
                        match: { _id: req.params.id }
                    }
                }
            }) as MatchStatistic[]
        res.send(matchStatistic.filter(item => item.match.team.academy != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/matchStatistic', async (req, res) => {
    try {
        const matchStatistic = models.MatchStatistic.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(matchStatistic)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/matchStatistic/:id', async (req, res) => {
    try {
        const matchStatistic = await models.MatchStatistic.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                attendance: req.body.attendance,
                remarks: req.body.remarks,
                goalsScored: req.body.goalsScored,
                yellowCards: req.body.yellowCards,
                redCards: req.body.redCards,
                minutesPlayed: req.body.minutesPlayed,
            },
            {
                new: true
            }
        )
        res.send(matchStatistic)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/matchStatistic/:id', async (req, res) => {
    try {
        const matchStatistic = await models.MatchStatistic.deleteMany({ match: req.params.id })
        console.log(matchStatistic.deletedCount)
        res.send(matchStatistic)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tournamentStatistic/tournament/:id', async (req, res) => {
    try {
        const tournamentStatistic = await models.TournamentStatistic.find({ tournament: req.params.id })
            .populate({
                path: 'player',
                model: 'Player',
            }) as TournamentStatistic[]

        res.send(tournamentStatistic.filter(item => item.tournament != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/tournamentStatistics/team/:id', async (req, res) => {
    try {
        const tournamentStatistic = await models.TournamentStatistic.find()
            .populate({
                path: 'player',
                model: 'Player'
            })
            .populate({
                path: 'tournament',
                model: 'Tournament',
                populate: {
                    path: 'team',
                    model: 'Team',
                    match: { _id: req.params.id }
                }
            }) as TournamentStatistic[]

        res.send(tournamentStatistic.filter(item => item.tournament != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/tournamentStatistics/academy/:id', async (req, res) => {
    try {
        const tournamentStatistic = await models.TournamentStatistic.find()
            .populate({
                path: 'player',
                model: 'Player'
            })
            .populate({
                path: 'tournament',
                model: 'Tournament',
                populate: {
                    path: 'team',
                    model: 'Team',
                    populate: {
                        path: 'academy',
                        model: 'Academy',
                        match: { _id: req.params.id }
                    }
                }
            }) as TournamentStatistic[]
        res.send(tournamentStatistic.filter(item => item.tournament.team.academy != null))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/tournamentStatistic', async (req, res) => {
    try {
        const tournamentStatistic = models.TournamentStatistic.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(tournamentStatistic)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/tournamentStatistic/:id', async (req, res) => {
    try {
        console.log('tournament st update')
        const tournamentStatistic = await models.TournamentStatistic.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                attendance: req.body.attendance,
                remarks: req.body.remarks,
                goalsScored: req.body.goalsScored,
                yellowCards: req.body.yellowCards,
                redCards: req.body.redCards,
                minutesPlayed: req.body.minutesPlayed,
            },
            {
                new: true
            }
        )
        res.send(tournamentStatistic)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tournamentStatistic/:id', async (req, res) => {
    try {
        const tournamentStatistic = await models.TournamentStatistic.deleteMany({ tournament: req.params.id })
        console.log(tournamentStatistic.deletedCount)
        res.send(tournamentStatistic)
    } catch (error) {
        res.status(400).send(error)
    }
})

