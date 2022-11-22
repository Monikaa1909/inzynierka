import { JwtPayload } from 'backend/database/schemas/User'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"

import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Trainer } from 'backend/database/schemas/Trainer.user'
import { Player } from 'backend/database/schemas/Player'
import { Parent } from 'backend/database/schemas/Parent.user'
import { Match } from 'backend/database/schemas/Match'
import { Team } from 'backend/database/schemas/Team'

export default (router: Router) => {
  router.get('/teams', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const { payload: payloadData } = useJwt(() => token ?? '')
          const payload = ref({} as JwtPayload)
          payload.value = payloadData.value as unknown as JwtPayload

          if (payload.value.type === 'AcademyManager') {
            const teams = await models.Team.find()
              .sort({ teamName: 1 })
              .populate({
                path: 'trainer',
                model: 'Trainer',
              })
              .populate({
                path: 'academy',
                model: 'Academy',
                match: { _id: payload.value.academy }
              }) as Team[]

            res.send(teams.filter(item => item.academy != null))

          } else if (payload.value.type === 'Trainer') {
            const teams = await models.Team.find()
              .sort({ teamName: 1 })
              .populate({
                path: 'trainer',
                model: 'Trainer',
                match: { _id: payload.value.id }
              }) as Team[]
            res.send(teams.filter(item => item.trainer != null))
          } else if (payload.value.type === 'Parent') {

            const player = await models.Player.find()
              .populate({
                path: 'parent',
                model: 'Parent',
                match: { _id: payload.value.id }
              })
              .select({ team: 1 }) as Player[]
              
            let teamsId: Array<any> = []
            player.filter(item => (item.parent != null && item.team != null)).forEach(element => {
              teamsId.push(element.team?._id.toString())
            })

            const teams = await models.Team.find({
              _id: { $in: teamsId }
            })
              .sort({ teamName: 1 })
              .populate({
                path: 'trainer',
                model: 'Trainer',
              }) as Team[]
            res.send(teams)
          } else {
            res.send(null)
          }

        } else {
          res.status(400).json({ error: "Malformed auth header" });
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  })
}