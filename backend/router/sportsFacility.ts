import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import models from "../database/models"
import { Router } from "express"

export default (router: Router) => {

  router.get('/sportsfacilities', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload && payload.type === 'AcademyManager' || payload.type === 'Trainer' || payload.type === 'Parent') {
            const sportsFacilities = await models.SportsFacility.find()
              .sort({ name: 1 })
              .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: payload.academy }
              }) as SportsFacility[]

            res.send(sportsFacilities.filter(item => item.academy != null))
          }

          else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
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

  router.get('/sportsFacility/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          const sportsFacility = await models.SportsFacility.findById(req.params.id)
          if (payload && (payload.type === 'AcademyManager' || payload.type === 'Trainer' || payload.type === 'Parent') && sportsFacility.academy._id.toString() === payload.academy) {
            res.send(sportsFacility)
          }

          else {
            res.status(400).json({ error: "Lack of sufficient permissions" });
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

  router.post('/sportsFacility', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload && payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const sportsFacility = models.SportsFacility.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(sportsFacility)
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

  router.post('/sportsFacility/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload && payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const sportsFacility = await models.SportsFacility.findOneAndUpdate(
              {
                _id: req.params.id
              },
              {
                name: req.body.name,
                academy: req.body.academy,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                postalCode: req.body.postalCode,
                city: req.body.city,
              },
              {
                new: true
              }
            )
            res.send(sportsFacility)
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

  router.delete('/sportsFacility/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload && payload.type === 'AcademyManager') {
            const sportsFacility = await models.SportsFacility.findOneAndDelete({ _id: req.params.id })
            res.send(sportsFacility)
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