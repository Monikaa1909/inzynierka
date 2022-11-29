import { seedDatabase } from '../database/seed'

import useTournamentStatisticRoutes from './tournamentStatistics'
import useMatchStatisticRoutes from './matchStatistics'
import useAttendanceListRoutes from './attendanceLists'
import useSportsFacilityRoutes from './sportsFacility'
import useTournamentRoutes from './tournament'
import useTrainingRoutes from './training'
import useAcademyRoutes from './academy'
import useTrainerRoutes from './trainer'
import useManagerRoutes from './manager'
import usePlayerRoutes from './player'
import useParentRoutes from './parent'
import useMatchRoutes from './match'
import useAuthRoutes from './auth'
import useTeamRoutes from './team'

import express from 'express'

const router = express.Router()


useTournamentStatisticRoutes(router)
useAttendanceListRoutes(router)
useSportsFacilityRoutes(router)
useMatchStatisticRoutes(router)
useTournamentRoutes(router)
useTrainingRoutes(router)
useAcademyRoutes(router)
useTrainerRoutes(router)
useManagerRoutes(router)
usePlayerRoutes(router)
useParentRoutes(router)
useMatchRoutes(router)
useAuthRoutes(router)
useTeamRoutes(router)

export default router

router.post('/db:seed', async (req, res) => {
    return seedDatabase()
})