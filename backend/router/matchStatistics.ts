import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

export default (router: Router) => {
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

  router.get('/matchStatistics', async (req, res) => {
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
              // match: { _id: req.params.id }
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

}