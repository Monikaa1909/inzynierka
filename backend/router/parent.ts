import { Parent } from 'backend/database/schemas/Parent.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

export default (router: Router) => {

  router.get('/parents', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const parents = await models.Parent.find()
              .sort({ lastName: 1, firstName: 1 })
              .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: payload.value.academy }
              }) as Parent[]

            res.send(parents.filter(item => item.academy != null))
          }

          else if (payload.value.type === 'Trainer') {
            const player = await models.Player.find()
              .populate({
                path: 'parent',
                model: 'Parent'
              })
              .populate({
                path: 'team',
                model: 'Team',
                populate: {
                  path: 'trainer',
                  model: 'Trainer',
                  match: { _id: payload.value.id }
                }
              }) as Player[]

            let parentsId: Array<any> = []
            player.filter(item => (item.team?.trainer != null && item.parent != null)).forEach(element => {
              parentsId.push(element.parent?._id.toString())
            })

            const parents = await models.Parent.find({
              _id: { $in: parentsId }
            })
              .sort({ lastName: 1, firstName: 1 })
              .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: payload.value.academy }
              }) as Parent[]

            res.send(parents.filter(item => item.academy != null))
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

  router.get('/parent/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          const parent = await models.Parent.findById(req.params.id)

          if (payload.value.type === 'AcademyManager' && parent.academy._id.toString() === payload.value.academy) {
            res.send(parent)
          }

          else if (payload.value.type === 'Trainer') {
            const player = await models.Player.find()
              .populate({
                path: 'parent',
                model: 'Parent'
              })
              .populate({
                path: 'team',
                model: 'Team',
                populate: {
                  path: 'trainer',
                  model: 'Trainer',
                  match: { _id: payload.value.id }
                }
              }) as Player[]

            let parentsId: Array<any> = []
            player.filter(item => (item.team?.trainer != null && item.parent != null)).forEach(element => {
              parentsId.push(element.parent?._id.toString())
            })

            if (parentsId.includes(parent._id.toString())) res.send(parent)
            else {
              res.status(400).json({ error: "Lack of sufficient permissions" });
            }
          }

          else if (payload.value.type === 'Parent') {

            if (parent._id.toString() === payload.value.id) res.send(parent)
            else {
              res.status(400).json({ error: "Lack of sufficient permissions" });
            }
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

  router.post('/parent', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const parent = models.Parent.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(parent)
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

  router.post('/parent/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager' || payload.value.type === 'Trainer') {
            const parent = await models.Parent.findOneAndUpdate(
              {
                _id: req.params.id
              },
              {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                remarks: req.body.remarks,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                academy: req.body.academy,
              },
              {
                new: true
              }
            )
            res.send(parent)
          }

          else if (payload.value.type === 'Parent' && req.params.id === payload.value.id) {
            const parent = await models.Parent.findOneAndUpdate(
              {
                _id: req.params.id
              },
              {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                remarks: req.body.remarks,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                academy: req.body.academy,
              },
              {
                new: true
              }
            )
            res.send(parent)
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

  router.delete('/parent/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const parent = await models.Parent.findOneAndDelete({ _id: req.params.id })
            res.send(parent)
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