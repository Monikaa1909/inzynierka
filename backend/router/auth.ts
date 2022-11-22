import { Trainer } from "backend/database/schemas/Trainer.user"
import { Parent } from "backend/database/schemas/Parent.user"
import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { User } from "backend/database/schemas/User"
import { Router } from "express"
import { models } from "mongoose"
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { AcademyManager } from "backend/database/schemas/AcademyManager.user"

export default (router: Router) => {

  router.post('/auth/register/trainer', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const password = crypto.randomBytes(16).toString('hex')

            const trainer: Trainer = await models.Trainer.create({
              ...req.body,
              password
            })

            res.send(password)
          }
          else {
            res.status(400).json({ error: "You have no rights to register a trainer" });
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

  router.post('/auth/register/manager', async (req, res) => {
    try {
      console.log('auth/register/manager')
      const password = crypto.randomBytes(16).toString('hex')

      const manager: AcademyManager = await models.AcademyManager.create({
        ...req.body,
        password
      })

      console.log(password)

      res.send(password)
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.post('/auth/register/parent', async (req, res) => {
    try {
      const password = crypto.randomBytes(16).toString('hex')

      const parent: Parent = await models.Parent.create({
        ...req.body,
        password
      })

      res.send(password)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/auth/login', async (req, res) => {
    try {
      if (!req.body.login || !req.body.password) {
        throw new Error('No credentials')
      }

      const user: User | null = await models.User.findOne({ login: req.body.login })

      if (!user) {
        throw new Error('Invalid login')
      }

      if (!await user.validatePassword(req.body.password)) {
        throw new Error('Invalid password')
      }

      res.send(await user.createToken())
    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  })

  router.post('/auth/validate/password/:id', async (req, res) => {
    try {
      if (!req.body.password) {
        res.send(false)
      } else {
        const user: User | null = await models.User.findById(req.params.id)

        if (!user) {
          res.send(false)
        }

        else if (!await user.validatePassword(req.body.password)) {
          res.send(false)
        }

        else res.send(true)
      }

    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  })

  router.post('/auth/change/password/:id', async (req, res) => {
    try {
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(req.body.newPassword, salt)

      const user: User | null = await models.User.findByIdAndUpdate(
        {
          _id: req.params.id
        },
        {
          password: hash
        },
        {
          new: true
        }
      )

      res.send(user)

    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  })

  router.post('/auth/trainer/password/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(req.body.newPassword, salt)
      
            const user: User | null = await models.User.findByIdAndUpdate(
              {
                _id: req.params.id
              },
              {
                password: hash
              },
              {
                new: true
              }
            )
      
            res.send(user)
          }
          else {
            res.status(400).json({ error: "You have no rights to change trainer password" });
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