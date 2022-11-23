import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

export default (router: Router) => {

  router.get('/managers', async (req, res) => {
    try {
      const academies = await models.AcademyManager.find()
        .populate({
          path: 'academy',
          model: 'Academy',
        })
      res.send(academies)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.get('/manager/:id', async (req, res) => {
    try {
      const academyManager = await models.AcademyManager.findById(req.params.id)
      res.send(academyManager)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/manager/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const manager = await models.AcademyManager.findOneAndUpdate(
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
            res.send(manager)
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

  router.delete('/manager/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const manager = await models.AcademyManager.findOneAndDelete({ _id: req.params.id })
            res.send(manager)
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