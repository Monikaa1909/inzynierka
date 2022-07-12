import express from 'express'
import { seedDatabase } from '../database/seed'
import models from '../database/models'

const router = express.Router()
export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})


router.get('/players', async (req, res) => {
    const players = await models.Player.find().populate('parent')
    res.send(players)
})

router.get('/player/:id', async (req, res) => {
    const player = await models.Player.find({ _id: req.params.id })
    res.send(player)
})

router.delete('/player/:id', async (req, res) => {
    const player = await models.Player.findOneAndDelete({ _id: req.params.id })
    res.send(player)
})

router.get('/teams', async (req, res) => {
    const teams = await models.Team.find()
    res.send(teams)
})

router.get('/team/:id', async (req, res) => {
    const team = await models.Team.find({ _id: req.params.id })
    res.send(team)
})

router.delete('/team/:id', async (req, res) => {
    const team = await models.Team.findOneAndDelete({ _id: req.params.id })
    res.send(team)
})

router.get('/matches', async (req, res) => {
    const matches = await models.Match.find()
    res.send(matches)
})

router.get('/sportsFacilities', async (req, res) => {
    const sportsFacilities = await models.SportsFacility.find().populate('academy').populate('address')
    res.send(sportsFacilities)
})