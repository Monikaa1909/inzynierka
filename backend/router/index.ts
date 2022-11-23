import express from 'express'
import { seedDatabase } from '../database/seed'
import models from '../database/models'

import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Parent } from 'backend/database/schemas/Parent.user'
import { Match } from 'backend/database/schemas/Match'

import useAuthRoutes from './auth'
import useTeamRoutes from './team'
import usePlayerRoutes from './player'
import useAcademyRoutes from './academy'
import useTrainerRoutes from './trainer'
import useParentRoutes from './parent'
import useMatchStatisticRoutes from './matchStatistics'
import useTournamentStatisticRoutes from './tournamentStatistics'
import useAttendanceListRoutes from './attendanceLists'
import useMatchRoutes from './match'
import useTrainingRoutes from './training'
import useTournamentRoutes from './tournament'
import useSportsFacilityRoutes from './sportsFacility'

const router = express.Router()

useAuthRoutes(router)
useTeamRoutes(router)
usePlayerRoutes(router)
useAcademyRoutes(router)
useTrainerRoutes(router)
useParentRoutes(router)
useMatchStatisticRoutes(router)
useTournamentStatisticRoutes(router)
useAttendanceListRoutes(router)
useSportsFacilityRoutes(router)
useTournamentRoutes(router)
useTrainingRoutes(router)
useMatchRoutes(router)

export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})

router.get('/managers', async (req, res) => {
    try {
        const academyManager = await models.AcademyManager.find()
        res.send(academyManager)
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





router.get('/matches/academy/:id', async (req, res) => {
    try {
        const matches = await models.Match.find()
            .populate('sportsFacility')
            .populate({
                path: 'team',
                model: 'Team',
                populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { _id: req.params.id }
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

router.get('/trainings/academy/:id', async (req, res) => {
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
                    match: { _id: req.params.id }
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

router.get('/tournaments/academy/:id', async (req, res) => {
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
                    match: { _id: req.params.id }
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

