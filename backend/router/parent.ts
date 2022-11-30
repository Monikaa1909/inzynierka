import { Parent } from 'backend/database/schemas/Parent.user'
import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

const getParents: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<Parent[]>> = {
  AcademyManager: async (payload) => {
    const parents = await models.Parent.find()
      .sort({ lastName: 1, firstName: 1 })
      .populate({
        path: 'academy',
        model: 'Academy',
        match: { _id: payload.academy }
      }) as Parent[]

    return parents.filter(item => item.academy != null)
  },
  Trainer: async (payload) => {
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
          match: { _id: payload.id }
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
        match: { _id: payload.academy }
      }) as Parent[]

    return parents.filter(item => item.academy != null)
  },
  Parent: async (payload) => {
    const parents = [] as Parent[]
    return parents
  },
}

export default (router: Router) => {

  router.get('/parents', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getParents)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getParents[payload.type](payload))
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
          const payload = jwtDecode<JwtPayload>(token ?? '')

          const parent = await models.Parent.findById(req.params.id)

          if (payload.type === 'AcademyManager' && parent.academy._id.toString() === payload.academy) {
            res.send(parent)
          }

          else if (payload.type === 'Trainer') {
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
                  match: { _id: payload.id }
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

          else if (payload.type === 'Parent') {

            if (parent._id.toString() === payload.id) res.send(parent)
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
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {
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
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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

          else if (payload.type === 'Parent' && req.params.id === payload.id) {
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
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {
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