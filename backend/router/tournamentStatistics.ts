import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

export default (router: Router) => {
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

  router.get('/tournamentStatistics', async (req, res) => {
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
              // match: { _id: req.params.id }
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
}