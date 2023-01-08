import { TournamentStatistic } from 'backend/database/schemas/TournamentStatistic'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import models from "../database/models"
import { Router } from "express"
import { MatchStatistic } from 'backend/database/schemas/MatchStatistic'
import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { Tournament } from 'backend/database/schemas/Tournament'
import { Match } from 'backend/database/schemas/Match'
import { Training } from 'backend/database/schemas/Training'

export default (router: Router) => {

  router.get('/academies', async (req, res) => {
    try {
      const academies = await models.Academy.find()
      res.send(academies)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.get('/academy/:id', async (req, res) => {
    try {
      const academy = await models.Academy.findById(req.params.id)
      res.send(academy)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/academy', async (req, res) => {
    try {
      const academy = new models.Academy({ academyName: req.body.academyName });
      academy.save(function (err: any) {
        if (err) {
          console.log(err.message)
          res.status(400).send(err)
        }
        else res.send(academy)
      })

    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.delete('/academy/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {

            const deletedAcademy = await models.Academy.findOneAndDelete({ _id: req.params.id })
            console.log("Usunięto " + deletedAcademy + " akademię")

            res.send("academy")
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" })
          }

        } else {
          console.log(1)
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        console.log(2)
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      console.log(3)
      res.status(400).send(error)
    }
  })

  router.delete('/academy/all/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager') {

            // Wyszukuję wszystkich _id statystyk z turniejów należących do wybranej akademii
            const tournamentStatistics = await models.TournamentStatistic.find()
              .populate({
                path: 'tournament',
                model: 'Tournament',
                populate: ({
                  path: 'team',
                  model: 'Team',
                  populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { _id: req.params.id }
                  }
                })
              }) as TournamentStatistic[]

            let tournamentStatisticsIds: Array<any> = []
            tournamentStatistics.filter(item => item.tournament.team.academy != null).forEach(element => {
              tournamentStatisticsIds.push(element._id.toString())
            })

            const deletedTournamentStatistics = await models.TournamentStatistic.deleteMany({ _id: { $in: tournamentStatisticsIds } })
            console.log("Usunięto " + deletedTournamentStatistics.deletedCount + " statystyk turnieju")

            // Wyszukuję wszystkich _id statystyk z meczów należących do wybranej akademii
            const matchStatistics = await models.MatchStatistic.find()
              .populate({
                path: 'match',
                model: 'Match',
                populate: ({
                  path: 'team',
                  model: 'Team',
                  populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { _id: req.params.id }
                  }
                })
              }) as MatchStatistic[]

            let matchStatisticsIds: Array<any> = []
            matchStatistics.filter(item => item.match.team.academy != null).forEach(element => {
              matchStatisticsIds.push(element._id.toString())
            })

            const deletedMatchStatistics = await models.MatchStatistic.deleteMany({ _id: { $in: matchStatisticsIds } })
            console.log("Usunięto " + deletedMatchStatistics.deletedCount + " statystyk meczu")

            // Wyszukuję wszystkich _id list obecności z treningów należących do wybranej akademii

            const attendanceLists = await models.AttendanceList.find()
              .populate({
                path: 'training',
                model: 'Training',
                populate: ({
                  path: 'team',
                  model: 'Team',
                  populate: {
                    path: 'academy',
                    model: 'Academy',
                    match: { _id: req.params.id }
                  }
                })
              }) as AttendanceList[]

            let attendanceListsIds: Array<any> = []

            attendanceLists.filter(item => item.training.team.academy != null).forEach(element => {
              attendanceListsIds.push(element._id.toString())
            })

            const deletedAttendanceLists = await models.AttendanceList.deleteMany({ _id: { $in: attendanceListsIds } })
            console.log("Usunięto " + deletedAttendanceLists.deletedCount + " list obecności")


            // Wyszukuję wszystkich _id turniejów należących do wybranej akademii
            const tournaments = await models.Tournament.find()
              .populate({
                path: 'team',
                model: 'Team',
                populate: {
                  path: 'academy',
                  model: 'Academy',
                  match: { _id: req.params.id }
                }
              }) as Tournament[]

            let tournamentsIds: Array<any> = []
            tournaments.filter(item => item.team.academy != null).forEach(element => {
              tournamentsIds.push(element._id.toString())
            })

            const deletedTournaments = await models.Tournament.deleteMany({ _id: { $in: tournamentsIds } })
            console.log("Usunięto " + deletedTournaments.deletedCount + " turniejów")

            // Wyszukuję wszystkich _id meczów należących do wybranej akademii
            const matches = await models.Match.find()
              .populate({
                path: 'team',
                model: 'Team',
                populate: {
                  path: 'academy',
                  model: 'Academy',
                  match: { _id: req.params.id }
                }
              }) as Match[]

            let matchesIds: Array<any> = []
            matches.filter(item => item.team.academy != null).forEach(element => {
              matchesIds.push(element._id.toString())
            })

            const deletedMatches = await models.Match.deleteMany({ _id: { $in: matchesIds } })
            console.log("Usunięto " + deletedMatches.deletedCount + " meczów")

            // Wyszukuję wszystkich _id treningów należących do wybranej akademii
            const trainings = await models.Training.find()
              .populate({
                path: 'team',
                model: 'Team',
                populate: {
                  path: 'academy',
                  model: 'Academy',
                  match: { _id: req.params.id }
                }
              }) as Training[]

            let trainingsIds: Array<any> = []
            trainings.filter(item => item.team.academy != null).forEach(element => {
              trainingsIds.push(element._id.toString())
            })

            const deletedTrainings = await models.Training.deleteMany({ _id: { $in: trainingsIds } })
            console.log("Usunięto " + deletedTrainings.deletedCount + " treningów")

            const deletedPlayers = await models.Player.deleteMany({ academy: req.params.id })
            console.log("Usunięto " + deletedPlayers.deletedCount + " zawodników")

            const deletedParents = await models.Parent.deleteMany({ academy: req.params.id })
            console.log("Usunięto " + deletedParents.deletedCount + " rodziców")

            const deletedTeams = await models.Team.deleteMany({ academy: req.params.id })
            console.log("Usunięto " + deletedTeams.deletedCount + " drużyn")

            const deletedTrainers = await models.Trainer.deleteMany({ academy: req.params.id })
            console.log("Usunięto " + deletedTrainers.deletedCount + " trenerów")

            const deletedSportsFacilities = await models.SportsFacility.deleteMany({ academy: req.params.id })
            console.log("Usunięto " + deletedSportsFacilities.deletedCount + " drużyn")

            const deletedAcademyManager = await models.AcademyManager.deleteMany({ academy: req.params.id })
            console.log("Usunięto " + deletedAcademyManager.deletedCount + " menadżerów")

            const deletedAcademy = await models.Academy.findOneAndDelete({ _id: req.params.id })
            console.log("Usunięto " + deletedAcademy + " akademię")

            res.send("academy")
          }
          else {
            res.status(400).json({ error: "Lack of sufficient permissions" })
          }

        } else {
          console.log(1)
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        console.log(2)
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      console.log(3)
      res.status(400).send(error)
    }
  })
}