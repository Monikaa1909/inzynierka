import { Training } from 'backend/database/schemas/Training'
import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import jwtDecode from "jwt-decode"
import { Router } from "express"
import models from "../database/models"

const getTrainings: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<Training[]>> = {
  AcademyManager: async (payload) => {
    const trainings = await models.Training.find()
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
      }) as Training[]

    return trainings.filter(item => item.team.academy != null)
  },
  Trainer: async (payload) => {
    const trainings = await models.Training.find()
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
      }) as Training[]

    return trainings.filter(item => item.team.trainer != null)
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

    const trainings = await models.Training.find()
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
      }) as Training[]

    return trainings.filter(item => item.team != null)
  },
}

const getTrainingsByTeam: Record<JwtPayload['type'], (payload: JwtPayload, team: String) => Promise<Training[]>> = {
  AcademyManager: async (payload, team) => {
    const trainings = await models.Training.find()
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: team }
      }) as Training[]
    return trainings.filter(item => (item.team != null))
  },
  Trainer: async (payload, team) => {
    const trainings = await models.Training.find()
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
      }) as Training[]

    return trainings.filter(item => (item.team != null && item.team.trainer != null))
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

    const trainings = await models.Training.find()
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
      }) as Training[]

    return trainings.filter(item => item.team != null)
  },
}

const getTrainingById: Record<JwtPayload['type'], (payload: JwtPayload, id: String) => Promise<Training>> = {
  AcademyManager: async (payload, id) => {
    const training = await models.Training.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        populate: ({
          path: 'academy',
          model: 'Academy',
        })
      }) as Training

    return training
  },
  Trainer: async (payload, id) => {
    const training = await models.Training.findById(id)
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
      }) as Training

    return training
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

    const training = await models.Training.findById(id)
      .sort({ date: 1 })
      .populate('sportsFacility')
      .populate({
        path: 'team',
        model: 'Team',
        match: { _id: { $in: teamsId } },
      }) as Training

    return training
  },
}

export default (router: Router) => {

  router.get('/trainings', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTrainings)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getTrainings[payload.type](payload))
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

  router.get('/trainings/team/:team', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (!payload || !(payload.type in getTrainingsByTeam)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getTrainingsByTeam[payload.type](payload, req.params.team))
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

  router.get('/training/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getTrainingById)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getTrainingById[payload.type](payload, req.params.id))
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

  router.post('/training', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const training = models.Training.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(training)
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

  router.post('/training/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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

  router.delete('/training/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {
            const training = await models.Training.findOneAndDelete({ _id: req.params.id })
              .populate({
                path: 'team',
                model: 'Team',
                populate: ({
                  path: 'academy',
                  model: 'Academy',
                  match: { _id: payload.academy }
                })
              })
            res.send(training)
          }

          else if (payload.type === 'Trainer') {
            const training = await models.Training.findOneAndDelete({ _id: req.params.id })
              .populate({
                path: 'team',
                model: 'Team',
                populate: ({
                  path: 'trainer',
                  model: 'Trainer',
                  match: { _id: payload.id }
                })
              })
            res.send(training)
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