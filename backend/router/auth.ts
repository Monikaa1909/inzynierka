import { Trainer } from "backend/database/schemas/Trainer.user"
import { Parent } from "backend/database/schemas/Parent.user"
import { User } from "backend/database/schemas/User"
import { Router } from "express"
import { models } from "mongoose"
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export default (router: Router) => {
  router.post('/auth/register/trainer', async (req, res) => {
    try {
      const password = crypto.randomBytes(16).toString('hex')

      const trainer: Trainer = await models.Trainer.create({
        ...req.body,
        password
      })

      console.log(password)

      res.send(password)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/auth/register/manager', async (req, res) => {
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

  router.post('/auth/register/parent', async (req, res) => {
    try {
      const password = crypto.randomBytes(16).toString('hex')

      const parent: Parent = await models.Parent.create({
        ...req.body,
        password
      })

      console.log(password)

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
      
      console.log(req.body.newPassword)
      console.log(user?.password)
      res.send(user)

    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }
  })
}