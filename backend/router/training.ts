import { JwtPayload } from 'backend/database/schemas/User'
import { Player } from 'backend/database/schemas/Player'
import { useJwt } from '@vueuse/integrations/useJwt'
import { Router } from "express"
import { models } from "mongoose"
import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { SportsFacility } from 'backend/database/schemas/SportsFacility'
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Training } from 'backend/database/schemas/Training'
import { Parent } from 'backend/database/schemas/Parent.user'
import { Match } from 'backend/database/schemas/Match'

export default (router: Router) => {

}