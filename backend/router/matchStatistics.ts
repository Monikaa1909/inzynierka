import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

const getMatchStatistics: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<MatchStatistic[]>> = {
  AcademyManager: async (payload) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'match',
        model: 'Match',
        populate: ({
          path: 'team',
          model: 'Team',
          populate: {
            path: 'academy',
            model: 'Academy',
            match: { _id: payload.academy }
          }
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => item.match.team.academy != null)
  },
  Trainer: async (payload) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'match',
        model: 'Match',
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
            populate: {
              path: 'academy',
              model: 'Academy',
            }
          })
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => item.match.team.trainer != null)
  },
  Parent: async (payload) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id }
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => item.player.parent != null)
  },
}

const getMatchStatisticsByTeam: Record<JwtPayload['type'], (payload: JwtPayload, team: String) => Promise<MatchStatistic[]>> = {
  AcademyManager: async (payload, team) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'match',
        model: 'Match',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team }
        })
      }) as MatchStatistic[]
    return matchStatistics.filter(item => (item.match.team != null))
  },
  Trainer: async (payload, team) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'match',
        model: 'Match',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team },
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
          })
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => (item.match.team != null && item.match.team.trainer != null))
  },
  Parent: async (payload, team) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id },
        })
      })
      .populate({
        path: 'match',
        model: 'Match',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team },
          populate: ({
            path: 'academy',
            model: 'Academy',
          })
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => (item.match.team != null && item.player.parent != null))
  },
}

const getMatchStatisticsByMatch: Record<JwtPayload['type'], (payload: JwtPayload, match: String) => Promise<MatchStatistic[]>> = {
  AcademyManager: async (payload, match) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'match',
        model: 'Match',
        match: { _id: match }
      }) as MatchStatistic[]
    return matchStatistics.filter(item => (item.match != null))
  },
  Trainer: async (payload, match) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'match',
        model: 'Match',
        match: { _id: match },
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
          })
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => (item.match != null && item.match.team.trainer != null))
  },
  Parent: async (payload, match) => {
    const matchStatistics = await models.MatchStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id },
        })
      })
      .populate({
        path: 'match',
        model: 'Match',
        match: { _id: match },
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'academy',
            model: 'Academy',
          })
        })
      }) as MatchStatistic[]

    return matchStatistics.filter(item => (item.match != null && item.player.parent != null))
  },
}

export default (router: Router) => {
  router.get('/matchStatistics/match/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getMatchStatisticsByMatch)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getMatchStatisticsByMatch[payload.type](payload, req.params.id))
        } else {
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.get('/matchStatistics/team/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getMatchStatisticsByTeam)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getMatchStatisticsByTeam[payload.type](payload, req.params.id))
        } else {
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.get('/matchStatistics', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getMatchStatistics)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getMatchStatistics[payload.type](payload))
        } else {
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.post('/matchStatistic', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const matchStatistic = models.MatchStatistic.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(matchStatistic)
            })
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
          }

        } else {
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/matchStatistic/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
          }

        } else {
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.delete('/matchStatistic/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const matchStatistic = await models.MatchStatistic.deleteMany({ match: req.params.id })
            res.send(matchStatistic)
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
          }

        } else {
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).send(error)
    }
  })
}