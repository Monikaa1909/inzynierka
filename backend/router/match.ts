import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { Match } from 'backend/database/schemas/Match'
import jwtDecode from "jwt-decode"
import models from "../database/models"
import { Router } from "express"

const getMatches: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<Match[]>> = {
  AcademyManager: async (payload) => {
    const matches = await models.Match.find()
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
      }) as Match[]

    return matches.filter(item => item.team.academy != null)
  },
  Trainer: async (payload) => {
    const matches = await models.Match.find()
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
      }) as Match[]

    return matches.filter(item => item.team.trainer != null)
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

    const matches = await models.Match.find()
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
      }) as Match[]

    return matches.filter(item => item.team != null)
  },
}

const getMatchesByTeam: Record<JwtPayload['type'], (payload: JwtPayload, team: String) => Promise<Match[]>> = {
  AcademyManager: async (payload, team) => {
    const matches = await models.Match.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: team }
      }) as Match[]
    return matches.filter(item => (item.team != null))
  },
  Trainer: async (payload, team) => {
    const matches = await models.Match.find()
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
      }) as Match[]

    return matches.filter(item => (item.team != null && item.team.trainer != null))
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

    const matches = await models.Match.find()
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
      }) as Match[]

    return matches.filter(item => item.team != null)
  },
}

const getMatchById: Record<JwtPayload['type'], (payload: JwtPayload, id: String) => Promise<Match>> = {
  AcademyManager: async (payload, id) => {
    const match = await models.Match.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        populate: ({
          path: 'academy',
          model: 'Academy',
        })
      }) as Match

    return match
  },
  Trainer: async (payload, id) => {
    const match = await models.Match.findById(id)
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
      }) as Match

    return match
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

    const match = await models.Match.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: { $in: teamsId } },
      }) as Match

    return match
  },
}

export default (router: Router) => {

  router.get('/matches', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getMatches)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getMatches[payload.type](payload))
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

  router.get('/matches/team/:team', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (!payload || !(payload.type in getMatchesByTeam)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getMatchesByTeam[payload.type](payload, req.params.team))
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

  router.get('/match/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getMatchById)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getMatchById[payload.type](payload, req.params.id))
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

  router.post('/match', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const match = models.Match.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(match)
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

  router.post('/match/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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

  router.delete('/match/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {
            const match = await models.Match.findOneAndDelete({ _id: req.params.id })
              .populate({
                path: 'team',
                model: 'Team',
                populate: ({
                  path: 'academy',
                  model: 'Academy',
                  match: { _id: payload.academy }
                })
              })
            res.send(match)
          }

          else if (payload.type === 'Trainer') {
            const match = await models.Match.findOneAndDelete({ _id: req.params.id })
              .populate({
                path: 'team',
                model: 'Team',
                populate: ({
                  path: 'trainer',
                  model: 'Trainer',
                  match: { _id: payload.id }
                })
              })
            res.send(match)
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