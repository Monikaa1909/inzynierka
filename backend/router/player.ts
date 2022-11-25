import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { useJwt } from '@vueuse/integrations/useJwt'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

const getPlayers: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<Player[]>> = {
	AcademyManager: async (payload) => {
		const players = await models.Player.find()
			.sort({ lastName: 1, firstName: 1 })
			.populate('parent')
			.populate({
				path: 'team',
				model: 'Team',
			})
			.populate({
				path: 'academy',
				model: 'Academy',
				match: { _id: payload.academy }
			}) as Player[]

		return players.filter(item => item.academy != null)
	},
	Trainer: async (payload) => {
		const players = await models.Player.find()
			.sort({ lastName: 1, firstName: 1 })
			.populate('parent')
			.populate({
				path: 'team',
				model: 'Team',
				populate: {
					path: 'trainer',
					model: 'Trainer',
					match: { _id: payload.id }
				}
			})
			.populate({
				path: 'academy',
				model: 'Academy'
			}) as Player[]

		return players.filter(item => item.team?.trainer != null)
	},
	Parent: async (payload) => {
		const players = await models.Player.find()
			.sort({ lastName: 1, firstName: 1 })
			.populate({
				path: 'parent',
				model: 'Parent',
				match: { _id: payload.id }
			})
			.populate({
				path: 'team',
				model: 'Team',
			})
			.populate({
				path: 'academy',
				model: 'Academy'
			}) as Player[]
			
		return players.filter(item => item.parent != null)
	},
}

export default (router: Router) => {

	router.get('/players', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')
					if (!payload || !(payload.type in getPlayers)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }

          res.send(await getPlayers[payload.type](payload))

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

	router.get('/players/team/:team', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager') {
						const players = await models.Player.find()
							.sort({ lastName: 1, firstName: 1 })
							.populate('parent')
							.populate({
								path: 'team',
								model: 'Team',
								match: { _id: req.params.team },
							})
							.populate({
								path: 'academy',
								model: 'Academy',
								match: { _id: payload.academy }
							}) as Player[]

						res.send(players.filter(item => (item.team != null && item.academy != null)))
					}

					else if (payload.type === 'Trainer') {
						const players = await models.Player.find()
							.sort({ lastName: 1, firstName: 1 })
							.populate('parent')
							.populate({
								path: 'team',
								model: 'Team',
								match: { _id: req.params.team },
								populate: {
									path: 'trainer',
									model: 'Trainer',
									match: { _id: payload.id }
								}
							})
							.populate({
								path: 'academy',
								model: 'Academy'
							}) as Player[]

						res.send(players.filter(item => (item.team != null && item.academy != null)))

					} else {
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

	router.get('/player/:id', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					const player = await models.Player.findById(req.params.id)
						.populate({
							path: 'parent',
							model: 'Parent',
						})
						.populate({
							path: 'team',
							model: 'Team',
							populate: {
								path: 'trainer',
								model: 'Trainer'
							}
						})
						.populate({
							path: 'academy',
							model: 'Academy',
						})

					if (payload.type === 'AcademyManager' && player.academy._id.toString() === payload.academy) {
						res.send(player)
					}

					else if (payload.type === 'Trainer' && player.team.trainer._id.toString() === payload.id) {
						res.send(player)
					}

					else if (payload.type === 'Parent' && player.parent._id.toString() === payload.id) {
						res.send(player)
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

	router.post('/player', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
						const player = models.Player.create(req.body, function (error: any) {
							if (error) {
								res.status(400).send(error)
							}
							else res.send(player)
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


	router.post('/player/:id', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
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

	router.delete('/player/:id', async (req, res) => {
		try {

			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const payload = jwtDecode<JwtPayload>(token ?? '')

					if (payload.type === 'AcademyManager') {
						const player = await models.Player.findOneAndDelete({ _id: req.params.id })
						res.send(player)
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