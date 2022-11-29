import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

const getTournamentStatistics: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<TournamentStatistic[]>> = {
  AcademyManager: async (payload) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'tournament',
        model: 'Tournament',
        populate: ({
          path: 'team',
          model: 'Team',
          populate: {
            path: 'academy',
            model: 'Academy',
            match: { _id: payload.academy }
          }
        })
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => item.tournament.team.academy != null)
  },
  Trainer: async (payload) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'tournament',
        model: 'Tournament',
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
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => item.tournament.team.trainer != null)
  },
  Parent: async (payload) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id }
        })
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => item.player.parent != null)
  },
}

const getTournamentStatisticsByTeam: Record<JwtPayload['type'], (payload: JwtPayload, team: String) => Promise<TournamentStatistic[]>> = {
  AcademyManager: async (payload, team) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'tournament',
        model: 'Tournament',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team }
        })
      }) as TournamentStatistic[]
    return tournamentStatistics.filter(item => (item.tournament.team != null))
  },
  Trainer: async (payload, team) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'tournament',
        model: 'Tournament',
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
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => (item.tournament.team != null && item.tournament.team.trainer != null))
  },
  Parent: async (payload, team) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
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
        path: 'tournament',
        model: 'Tournament',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team },
          populate: ({
            path: 'academy',
            model: 'Academy',
          })
        })
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => (item.tournament.team != null && item.player.parent != null))
  },
}

const getTournamentStatisticsByTournament: Record<JwtPayload['type'], (payload: JwtPayload, tournament: String) => Promise<TournamentStatistic[]>> = {
  AcademyManager: async (payload, tournament) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'tournament',
        model: 'Tournament',
        match: { _id: tournament }
      }) as TournamentStatistic[]
    return tournamentStatistics.filter(item => (item.tournament != null))
  },
  Trainer: async (payload, tournament) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'tournament',
        model: 'Tournament',
        match: { _id: tournament },
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
          })
        })
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => (item.tournament != null && item.tournament.team.trainer != null))
  },
  Parent: async (payload, tournament) => {
    const tournamentStatistics = await models.TournamentStatistic.find()
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
        path: 'tournament',
        model: 'Tournament',
        match: { _id: tournament },
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'academy',
            model: 'Academy',
          })
        })
      }) as TournamentStatistic[]

    return tournamentStatistics.filter(item => (item.tournament != null && item.player.parent != null))
  },
}

export default (router: Router) => {
  router.get('/tournamentStatistics/tournament/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTournamentStatisticsByTournament)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getTournamentStatisticsByTournament[payload.type](payload, req.params.id))
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

  router.get('/tournamentStatistics/team/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTournamentStatisticsByTeam)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getTournamentStatisticsByTeam[payload.type](payload, req.params.id))
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

  router.get('/tournamentStatistics', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTournamentStatistics)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getTournamentStatistics[payload.type](payload))
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

  router.post('/tournamentStatistic', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const tournamentStatistic = models.TournamentStatistic.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(tournamentStatistic)
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

  router.post('/tournamentStatistic/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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

  router.delete('/tournamentStatistic/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const tournamentStatistic = await models.TournamentStatistic.deleteMany({ tournament: req.params.id })
            res.send(tournamentStatistic)
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