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
  router.get('/players', async (req, res) => {
    try {
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
        }) as Player[]

    res.send(players)
        
    } catch (error) {
        res.status(400).send(error)
    }
})
}