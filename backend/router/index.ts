import express from 'express'
import { seedDatabase } from '../database/seed'
import models from '../database/models'
import { Player } from 'backend/database/schemas/Player'
import { Parent } from 'backend/database/schemas/Parent'
import { Team } from 'backend/database/schemas/Team'

const router = express.Router()
export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})

router.get('/academy/:name', async (req, res) => {
    try {
        const academy = await models.Academy.findOne({academyName: req.params.name})
        res.send(academy)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/players/:academy', async (req, res) => {
    try {
        console.log(req.params.academy)
        const players = await models.Player.find()
            .sort({lastName: 1, firstName: 1})
            .populate('parent')
            .populate({
                path: 'team',
                model: 'Team',
                populate: {
                    path: 'trainer',
                    model: 'Trainer',
                    populate: {
                        path: 'academy',
                        model: 'Academy',
                        match: { academyName: req.params.academy }
                    }
                }
            }) as Player[]

        res.send(players.filter(item => item.team.trainer.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/player/:id', async (req, res) => {
    try {
        const player = await models.Player.findById(req.params.id)
            .populate('parent')
            .populate({
                path: 'team',
                model: 'Team',
            })
        res.send(player)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/player', async (req, res) => {
    try {
        const player = models.Player.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(player)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/player/:id', async (req, res) => {
    try {
        const player = await models.Player.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdayDate: req.body.birthdayDate,
                nationality: req.body.nationality,
                remarks: req.body.remarks,
                validityOfMedicalExaminations: req.body.validityOfMedicalExaminations,
                team: req.body.team,
                parent: req.body.parent,
            },
            {
                new: true
            }
        )
        res.send(player)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/player/:id', async (req, res) => {
    try {
        const player = await models.Player.findOneAndDelete({ _id: req.params.id })
        res.send(player)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/parents/:academy', async (req, res) => {
    try {
        const parents = await models.Parent.find()
            .sort({lastName: 1, firstName: 1})
            .populate({
                path: 'academy',
                model: 'Academy',
                match: { academyName: req.params.academy }
            }) as Parent[]
        res.send(parents.filter(item => item.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/parent/:id', async (req, res) => {
    try {
        const parent = await models.Parent.findById(req.params.id)

        res.send(parent)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/parent', async (req, res) => {
    try {
        const parent = models.Parent.create(req.body, function (error: any) {
            if (error) {
                res.status(400).send(error)
            }
            else res.send(parent)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/parent/:id', async (req, res) => {
    try {
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
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/parent/:id', async (req, res) => {
    try {
        const parent = await models.Parent.findOneAndDelete({ _id: req.params.id })
        res.send(parent)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/teams/:academy', async (req, res) => {
    try {
        console.log(req.params.academy)
        const teams = await models.Team.find()
            .sort({teamName: 1})
            .populate({
                path: 'trainer',
                model: 'Trainer',
                populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { academyName: req.params.academy }
                }
            }) as Team[]

        res.send(teams.filter(item => item.trainer.academy != null))
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/team/:id', async (req, res) => {
    const team = await models.Team.find({ _id: req.params.id })
    res.send(team)
})

router.get('/:academy/matches', async (req, res) => {
    try {
        const matches = await models.Match.find()
            .populate({
                path: 'team',
                model: 'Team',
                populate: {
                    path: 'trainer',
                    model: 'Trainer',
                    populate: {
                        path: 'academy',
                        model: 'Academy',
                        match: { name: req.params.academy }
                    }
                }
            })

        res.send(matches)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/sportsFacilities', async (req, res) => {
    const sportsFacilities = await models.SportsFacility.find().populate('academy').populate('address')
    res.send(sportsFacilities)
})