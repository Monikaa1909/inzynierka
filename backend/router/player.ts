import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

export default (router: Router) => {

	router.get('/players', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const { payload: payloadData } = useJwt(() => token ?? '')
					const payload = ref({} as JwtPayload)
					payload.value = payloadData.value as unknown as JwtPayload

					if (payload.value.type === 'AcademyManager') {
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
								match: { _id: payload.value.academy }
							}) as Player[]

						res.send(players.filter(item => item.academy != null))

					}

					else if (payload.value.type === 'Trainer') {
						const players = await models.Player.find()
							.sort({ lastName: 1, firstName: 1 })
							.populate('parent')
							.populate({
								path: 'team',
								model: 'Team',
								populate: {
									path: 'trainer',
									model: 'Trainer',
									match: { _id: payload.value.id }
								}
							})
							.populate({
								path: 'academy',
								model: 'Academy'
							}) as Player[]

						res.send(players.filter(item => item.team?.trainer != null))

					} else if (payload.value.type === 'Parent') {
						const players = await models.Player.find()
							.sort({ lastName: 1, firstName: 1 })
							.populate({
								path: 'parent',
								model: 'Parent',
								match: { _id: payload.value.id }
							})
							.populate({
								path: 'team',
								model: 'Team',
							})
							.populate({
								path: 'academy',
								model: 'Academy'
							}) as Player[]

						res.send(players.filter(item => item.parent != null))

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

	router.get('/players/team/:team', async (req, res) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(" ")[1]

				if (token) {
					const { payload: payloadData } = useJwt(() => token ?? '')
					const payload = ref({} as JwtPayload)
					payload.value = payloadData.value as unknown as JwtPayload

					if (payload.value.type === 'AcademyManager') {
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
								match: { _id: payload.value.academy }
							}) as Player[]

						res.send(players.filter(item => (item.team != null && item.academy != null)))
					}

					else if (payload.value.type === 'Trainer') {
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
									match: { _id: payload.value.id }
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
					const { payload: payloadData } = useJwt(() => token ?? '')
					const payload = ref({} as JwtPayload)
					payload.value = payloadData.value as unknown as JwtPayload

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

					if (payload.value.type === 'AcademyManager' && player.academy._id.toString() === payload.value.academy) {
						res.send(player)
					}

					else if (payload.value.type === 'Trainer' && player.team.trainer._id.toString() === payload.value.id) {
						res.send(player)
					}

					else if (payload.value.type === 'Parent' && player.parent._id.toString() === payload.value.id) {
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
			if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager' || payload.value.type === 'Trainer') {
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
					const { payload: payloadData } = useJwt(() => token ?? '')
					const payload = ref({} as JwtPayload)
					payload.value = payloadData.value as unknown as JwtPayload

					if (payload.value.type === 'AcademyManager') {
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