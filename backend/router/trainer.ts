import { Trainer } from 'backend/database/schemas/Trainer.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

export default (router: Router) => {

  router.get('/trainers/:academy', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.academy === req.params.academy) {
            const trainer = await models.Trainer.find()
              .sort({ lastName: 1, firstName: 1 })
              .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: req.params.academy }
              }) as Trainer[]

            res.send(trainer.filter(item => item.academy != null))
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

  router.get('/trainer/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          const trainer = await models.Trainer.findById(req.params.id)

          if (payload.value.academy === trainer.academy._id.toString()) {
            res.send(trainer)
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
            res.status(400).json({ error: "Lack of sufficient permissions" });
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

          else if (payload.value.type === 'Trainer' && req.params.id === payload.value.id) {
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