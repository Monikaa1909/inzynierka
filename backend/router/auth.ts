import { Trainer } from "backend/database/schemas/Trainer.user"
import { User } from "backend/database/schemas/User"
import { Router } from "express"
import { models } from "mongoose"
import crypto from 'crypto'

export default (router: Router) => {
  router.post('/auth/register/trainer', async (req, res) => {
    try {
      const password = crypto.randomBytes(16).toString('hex')

      const trainer: Trainer = await models.Trainer.create({
        ...req.body,
        password
      })

      console.log(password)

      res.send(trainer)
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
}