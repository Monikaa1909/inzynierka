import express from 'express'
import { seedDatabase } from '../database/seed'
import models from '../database/models'
import Player from 'backend/database/oldSchemas/Player'

const router = express.Router()
export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})

router.get('/:academy/players', async (req, res) => {
    try {
        const players = await models.Player.find()
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
                        match: { name: req.params.academy }
                    }
                }
            })

        res.send(players)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/player/:id', async (req, res) => {
    try {
        const players = await models.Player.findById(req.params.id)
            .populate('parent')
            .populate({
                path: 'team',
                model: 'Team',
                // populate: {
                //     path: 'trainer',
                //     model: 'Trainer',
                //     populate: {
                //         path: 'academy',
                //         model: 'Academy',
                //     }
                // }
            })
        res.send(players)
    } catch (error) {
        res.status(400).send(error)
    }

    // try {
    //     const players = await models.Player.find({ })
    //         .populate('parent')
    //         .populate('team')
    //     res.send(players)
    // } catch (error) {
    //     res.status(400).send(error)
    // }

    // const query = await models.Player.findOne({ _id: req.params.id })
    // res.send(query)
})

router.post('/player', async (req, res) => {
    const player = models.Player.create(req.body, function (error: any) {
        if (error) {
            console.log(error.message);
            res.status(400).send(error)
        }
        else res.send(player)
    });
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

router.get('/parents', async (req, res) => {
    const parents = await models.Parent.find()
    res.send(parents)
})

router.get('/sportsFacilities', async (req, res) => {
    const sportsFacilities = await models.SportsFacility.find().populate('academy').populate('address')
    res.send(sportsFacilities)
})