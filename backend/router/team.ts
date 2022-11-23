import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { Team } from 'backend/database/schemas/Team'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

export default (router: Router) => {

  router.get('/teams', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const teams = await models.Team.find()
              .sort({ teamName: 1 })
              .populate({
                path: 'trainer',
                model: 'Trainer',
              })
              .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: payload.value.academy }
              }) as Team[]

            res.send(teams.filter(item => item.academy != null))

          } else if (payload.value.type === 'Trainer') {
            const teams = await models.Team.find()
              .sort({ teamName: 1 })
              .populate({
                path: 'trainer',
                model: 'Trainer',
                match: { _id: payload.value.id }
              }) as Team[]
            res.send(teams.filter(item => item.trainer != null))
          } else if (payload.value.type === 'Parent') {

            const player = await models.Player.find()
              .populate({
                path: 'parent',
                model: 'Parent',
                match: { _id: payload.value.id }
              })
              .select({ team: 1 }) as Player[]

            let teamsId: Array<any> = []
            player.filter(item => (item.parent != null && item.team != null)).forEach(element => {
              teamsId.push(element.team?._id.toString())
            })

            const teams = await models.Team.find({
              _id: { $in: teamsId }
            })
              .sort({ teamName: 1 })
              .populate({
                path: 'trainer',
                model: 'Trainer',
              }) as Team[]
            res.send(teams)
          } else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
          }

        } else {
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  })

  router.get('/team/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          const team = await models.Team.findById(req.params.id)
            .populate({
              path: 'trainer',
              model: 'Trainer',
            })

          if (payload.value.academy === team.academy._id.toString()) {
            res.send(team)
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" })
          }

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

  router.post('/team', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const team = models.Team.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(team)
            })
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
          }

        } else {
          console.log("Malformed auth header")
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/team/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
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
          } else if (payload.value.type === 'Trainer') {
            const potentialTeam = await models.Team.findById(req.params.id)

            if (potentialTeam.trainer._id.toString() === payload.value.id) {
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
            } else {
              res.status(400).json({ error: "Lack of sufficient permissions" });
            }

          }
          else {
            res.status(400).json({ error: "You have no rights to update a team" });
          }

        } else {
          console.log("Malformed auth header")
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.delete('/team/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const team = await models.Team.findOneAndDelete({ _id: req.params.id })
            res.send(team)
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