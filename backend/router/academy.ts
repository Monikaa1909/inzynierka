import { Router } from "express"
import { models } from "mongoose"

export default (router: Router) => {

  router.get('/academies', async (req, res) => {
    try {
      const academies = await models.Academy.find()
      res.send(academies)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.get('/academy/:id', async (req, res) => {
    try {
      const academy = await models.Academy.findById(req.params.id)
      res.send(academy)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/academy', async (req, res) => {
    try {
      const academy = new models.Academy({ academyName: req.body.academyName });
      academy.save(function (err: any) {
        if (err) {
          console.log(err.message)
          res.status(400).send(err)
        }
        else res.send(academy)
      })

    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.delete('/academy/:id', async (req, res) => {
    try {
      const academy = await models.Academy.findOneAndDelete({ _id: req.params.id })
      res.send(academy)
    } catch (error) {
      res.status(400).send(error)
    }
  })
}