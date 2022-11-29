import { Tournament } from 'backend/database/schemas/Tournament'
import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

const getTournaments: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<Tournament[]>> = {
  AcademyManager: async (payload) => {
    const tournaments = await models.Tournament.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        populate: {
          path: 'academy',
          model: 'Academy',
          match: { _id: payload.academy }
        }
      }) as Tournament[]

    return tournaments.filter(item => item.team.academy != null)
  },
  Trainer: async (payload) => {
    const tournaments = await models.Tournament.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
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
      }) as Tournament[]

    return tournaments.filter(item => item.team.trainer != null)
  },
  Parent: async (payload) => {
    const player = await models.Player.find()
      .populate({
        path: 'parent',
        model: 'Parent',
        match: { _id: payload.id }
      })
      .select({ team: 1 }) as Player[]

    let teamsId: Array<any> = []
    player.filter(item => (item.parent != null && item.team != null)).forEach(element => {
      teamsId.push(element.team?._id.toString())
    })

    const tournaments = await models.Tournament.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: { $in: teamsId } },
        populate: ({
          path: 'academy',
          model: 'Academy',
        })
      }) as Tournament[]

    return tournaments.filter(item => item.team != null)
  },
}

const getTournamentsByTeam: Record<JwtPayload['type'], (payload: JwtPayload, team: String) => Promise<Tournament[]>> = {
  AcademyManager: async (payload, team) => {
    const tournaments = await models.Tournament.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: team }
      }) as Tournament[]
    return tournaments.filter(item => (item.team != null))
  },
  Trainer: async (payload, team) => {
    const tournaments = await models.Tournament.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: team },
        populate: ({
          path: 'trainer',
          model: 'Trainer',
          match: { _id: payload.id },
        })
      }) as Tournament[]

    return tournaments.filter(item => (item.team != null && item.team.trainer != null))
  },
  Parent: async (payload, team) => {
    const player = await models.Player.find()
      .populate({
        path: 'parent',
        model: 'Parent',
        match: { _id: payload.id }
      })
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: team }
      })
      .select({ team: 1 }) as Player[]

    let teamsId: Array<any> = []
    player.filter(item => (item.parent != null && item.team != null)).forEach(element => {
      teamsId.push(element.team?._id.toString())
    })

    const tournaments = await models.Tournament.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: { $in: teamsId } },
        populate: ({
          path: 'academy',
          model: 'Academy',
        })
      }) as Tournament[]

    return tournaments.filter(item => item.team != null)
  },
}

const getTournamentById: Record<JwtPayload['type'], (payload: JwtPayload, id: String) => Promise<Tournament>> = {
  AcademyManager: async (payload, id) => {
    const tournament = await models.Tournament.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        populate: ({
          path: 'academy',
          model: 'Academy',
        })
      }) as Tournament

    return tournament
  },
  Trainer: async (payload, id) => {
    const tournament = await models.Tournament.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        populate: ({
          path: 'trainer',
          model: 'Trainer',
          match: { _id: payload.id },
        })
      }) as Tournament

    return tournament
  },
  Parent: async (payload, id) => {
    const player = await models.Player.find()
      .populate({
        path: 'parent',
        model: 'Parent',
        match: { _id: payload.id }
      })
      .populate({
        path: 'team',
        model: 'Team',
      })
      .select({ team: 1 }) as Player[]

    let teamsId: Array<any> = []
    player.filter(item => (item.parent != null)).forEach(element => {
      teamsId.push(element.team?._id.toString())
    })

    const tournament = await models.Tournament.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: { $in: teamsId } },
      }) as Tournament

    return tournament
  },
}

export default (router: Router) => {

  router.get('/tournaments', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTournaments)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getTournaments[payload.type](payload))
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

  router.get('/tournaments/team/:team', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (!payload || !(payload.type in getTournamentsByTeam)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getTournamentsByTeam[payload.type](payload, req.params.team))
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

  router.get('/tournament/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTournamentById)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getTournamentById[payload.type](payload, req.params.id))
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

  router.post('/tournament', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const tournament = models.Tournament.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(tournament)
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

  router.post('/tournament/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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

  router.delete('/tournament/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {
            const tournament = await models.Tournament.findOneAndDelete({ _id: req.params.id })
              .populate({
                path: 'team',
                model: 'Team',
                populate: ({
                  path: 'academy',
                  model: 'Academy',
                  match: { _id: payload.academy }
                })
              })
            res.send(tournament)
          }

          else if (payload.type === 'Trainer') {
            const tournament = await models.Tournament.findOneAndDelete({ _id: req.params.id })
              .populate({
                path: 'team',
                model: 'Team',
                populate: ({
                  path: 'trainer',
                  model: 'Trainer',
                  match: { _id: payload.id }
                })
              })
            res.send(tournament)
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