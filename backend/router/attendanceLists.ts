import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import models from "../database/models"
import { Router } from "express"

const getAttendanceLists: Record<JwtPayload['type'], (payload: JwtPayload) => Promise<AttendanceList[]>> = {
  AcademyManager: async (payload) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'training',
        model: 'Training',
        populate: ({
          path: 'team',
          model: 'Team',
          populate: {
            path: 'academy',
            model: 'Academy',
            match: { _id: payload.academy }
          }
        })
      }) as AttendanceList[]
    return attendanceLists.filter(item => item.training.team.academy != null)
  },
  Trainer: async (payload) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'training',
        model: 'Training',
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
            populate: {
              path: 'academy',
              model: 'Academy',
            }
          })
        })
      }) as AttendanceList[]

    return attendanceLists.filter(item => item.training.team.trainer != null)
  },
  Parent: async (payload) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id }
        })
      }) as AttendanceList[]

    return attendanceLists.filter(item => item.player.parent != null)
  },
}

const getAttendanceListsByTeam: Record<JwtPayload['type'], (payload: JwtPayload, team: String) => Promise<AttendanceList[]>> = {
  AcademyManager: async (payload, team) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'training',
        model: 'Training',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team }
        })
      }) as AttendanceList[]
    return attendanceLists.filter(item => (item.training.team != null))
  },
  Trainer: async (payload, team) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'training',
        model: 'Training',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team },
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
          })
        })
      }) as AttendanceList[]

    return attendanceLists.filter(item => (item.training.team != null && item.training.team.trainer != null))
  },
  Parent: async (payload, team) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id },
        })
      })
      .populate({
        path: 'training',
        model: 'Training',
        populate: ({
          path: 'team',
          model: 'Team',
          match: { _id: team },
          populate: ({
            path: 'academy',
            model: 'Academy',
          })
        })
      }) as AttendanceList[]

    return attendanceLists.filter(item => (item.training.team != null && item.player.parent != null))
  },
}

const getAttendanceListsByTraining: Record<JwtPayload['type'], (payload: JwtPayload, training: String) => Promise<AttendanceList[]>> = {
  AcademyManager: async (payload, training) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'training',
        model: 'Training',
        match: { _id: training }
      }) as AttendanceList[]
    return attendanceLists.filter(item => (item.training != null))
  },
  Trainer: async (payload, training) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
      })
      .populate({
        path: 'training',
        model: 'Training',
        match: { _id: training },
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'trainer',
            model: 'Trainer',
            match: { _id: payload.id },
          })
        })
      }) as AttendanceList[]

    return attendanceLists.filter(item => (item.training != null && item.training.team.trainer != null))
  },
  Parent: async (payload, training) => {
    const attendanceLists = await models.AttendanceList.find()
      .populate({
        path: 'player',
        model: 'Player',
        populate: ({
          path: 'parent',
          model: 'Parent',
          match: { _id: payload.id },
        })
      })
      .populate({
        path: 'training',
        model: 'Training',
        match: { _id: training },
        populate: ({
          path: 'team',
          model: 'Team',
          populate: ({
            path: 'academy',
            model: 'Academy',
          })
        })
      }) as AttendanceList[]

    return attendanceLists.filter(item => (item.training != null && item.player.parent != null))
  },
}

export default (router: Router) => {
  router.get('/attendanceLists/training/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getAttendanceListsByTraining)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getAttendanceListsByTraining[payload.type](payload, req.params.id))
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

  router.get('/attendanceLists/team/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getAttendanceListsByTeam)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getAttendanceListsByTeam[payload.type](payload, req.params.id))
        } else {
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.get('/attendanceLists', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')
          if (!payload || !(payload.type in getAttendanceLists)) {
            res.status(400).json({ error: "Lack of sufficient permissions" });
            return
          }
          res.send(await getAttendanceLists[payload.type](payload))
        } else {
          res.status(400).json({ error: "Malformed auth header" })
        }
      } else {
        res.status(400).json({ error: "No authorization header" })
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.post('/attendanceList', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const attendanceList = models.AttendanceList.create(req.body, function (error: any) {
              if (error) {
                res.status(400).send(error)
              }
              else res.send(attendanceList)
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

  router.post('/attendanceList/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const attendanceList = await models.AttendanceList.findOneAndUpdate(
              {
                _id: req.params.id
              },
              {
                attendance: req.body.attendance,
                remarks: req.body.remarks,
              },
              {
                new: true
              }
            )
            res.send(attendanceList)
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

  router.delete('/attendanceList/:id', async (req, res) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        if (token) {
          const payload = jwtDecode<JwtPayload>(token ?? '')

          if (payload.type === 'AcademyManager' || payload.type === 'Trainer') {
            const attendanceList = await models.AttendanceList.deleteMany({ training: req.params.id })
            res.send(attendanceList)
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