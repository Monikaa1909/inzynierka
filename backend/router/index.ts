import express from 'express'
import { seedDatabase } from '../database/seed'
import { Player } from '../database/models'

const router = express.Router()
export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})


router.get('/players', async (req, res) => {
    const players = await Player.find()
    res.send(players)
})

let i = 0
router.post('/player/createDummy', async (req, res) => {
    const player = new Player({
        firstName: 'Player',
        lastName: i++
    })

    await player.save()
    res.send(player)
})

router.delete('/player/:id', async (req, res) => {
    const player = await Player.findOneAndDelete({ _id: req.params.id })
    res.send(player)
})