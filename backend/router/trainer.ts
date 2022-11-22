import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

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

export default (router: Router) => {

  // router.get('/trainers', async (req, res) => {
  //   try {
  //     if (req.headers.authorization) {
  //       const token = req.headers.authorization.split(" ")[1]

  //       if (token) {
  //         const { payload: payloadData } = useJwt(() => token ?? '')
  //         const payload = ref({} as JwtPayload)
  //         payload.value = payloadData.value as unknown as JwtPayload

  //         if (payload.value.type === 'AcademyManager') {
  //           const trainers = await models.Trainer.find()
  //             .sort({ lastName: 1, firstName: 1 })
  //             .populate({
  //               path: 'academy',
  //               model: 'Academy',
  //               match: { _id: payload.value.academy }
  //             }) as Trainer[]

  //           res.send(trainers.filter(item => item.academy != null))

  //         } else if (payload.value.type === 'Trainer') {
  //           const teams = await models.Team.find()
  //             .sort({ teamName: 1 })
  //             .populate({
  //               path: 'trainer',
  //               model: 'Trainer',
  //               match: { _id: payload.value.id }
  //             }) as Team[]
  //           res.send(teams.filter(item => item.trainer != null))
  //         } else if (payload.value.type === 'Parent') {

  //           const player = await models.Player.find()
  //             .populate({
  //               path: 'parent',
  //               model: 'Parent',
  //               match: { _id: payload.value.id }
  //             })
  //             .select({ team: 1 }) as Player[]

  //           let teamsId: Array<any> = []
  //           player.filter(item => (item.parent != null && item.team != null)).forEach(element => {
  //             teamsId.push(element.team?._id.toString())
  //           })

  //           const teams = await models.Team.find({
  //             _id: { $in: teamsId }
  //           })
  //             .sort({ teamName: 1 })
  //             .populate({
  //               path: 'trainer',
  //               model: 'Trainer',
  //             }) as Team[]
  //           res.send(teams)
  //         } else {
  //           res.send(null)
  //         }

  //       } else {
  //         res.status(400).json({ error: "Malformed auth header" });
  //       }
  //     } else {
  //       res.status(400).json({ error: "No authorization header" })
  //     }
  //   } catch (error) {
  //     res.status(400).json(error)
  //   }
  // })

  router.get('/trainers/:academy', async (req, res) => {
    try {
      const trainer = await models.Trainer.find()
        .sort({ lastName: 1, firstName: 1 })
        .populate({
          path: 'academy',
          model: 'Academy',
          match: { _id: req.params.academy }
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
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const trainer = models.Trainer.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(trainer)
            })
          }
          else {
            res.status(400).json({ error: "You have no rights to create a trainer" });
          }

        } else {
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }

    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.post('/trainer/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
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
          }
          else {
            res.status(400).json({ error: "You have no rights to update a trainer" });
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

  router.delete('/trainer/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const trainer = await models.Trainer.findOneAndDelete({ _id: req.params.id })
            res.send(trainer)
          }
          else {
            res.status(400).json({ error: "You have no rights to delete a trainer" });
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