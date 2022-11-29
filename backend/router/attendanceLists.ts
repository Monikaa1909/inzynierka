import { AttendanceList } from 'backend/database/schemas/AttendanceList'
import { JwtPayload } from 'backend/database/schemas/User'
import jwtDecode from "jwt-decode"
import { models } from "mongoose"
import { Router } from "express"

export default (router: Router) => {
  router.get('/attendanceLists/training/:id', async (req, res) => {
    try {
      const attendaceList = await models.AttendanceList.find({ training: req.params.id })
        .populate({
          path: 'player',
          model: 'Player',
        }) as AttendanceList[]

      res.send(attendaceList.filter(item => item.training != null))
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.get('/attendanceList/team/:id', async (req, res) => {
    try {
      const attendanceList = await models.AttendanceList.find()
        .populate({
          path: 'player',
          model: 'Player'
        })
        .populate({
          path: 'training',
          model: 'Training',
          populate: {
            path: 'team',
            model: 'Team',
            match: { _id: req.params.id }
          }
        }) as AttendanceList[]

      res.send(attendanceList.filter(item => item.training != null))
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.get('/attendanceLists', async (req, res) => {
    try {
      const attendanceList = await models.AttendanceList.find()
        .populate({
          path: 'player',
          model: 'Player'
        })
        .populate({
          path: 'training',
          model: 'Training',
          populate: {
            path: 'team',
            model: 'Team',
            populate: {
              path: 'academy',
              model: 'Academy',
              // match: { _id: req.params.id }
            }
          }
        }) as AttendanceList[]
      res.send(attendanceList.filter(item => item.training.team.academy != null))
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  })

  router.post('/attendanceList', async (req, res) => {
    try {
      const attendanceList = models.AttendanceList.create(req.body, function (error: any) {
        if (error) {
          res.status(400).send(error)
        }
        else res.send(attendanceList)
      })
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.post('/attendanceList/:id', async (req, res) => {
    try {
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
    } catch (error) {
      res.status(400).send(error)
    }
  })

  router.delete('/attendanceList/:id', async (req, res) => {
    try {
      const attendanceList = await models.AttendanceList.deleteMany({ training: req.params.id })
      res.send(attendanceList)
    } catch (error) {
      res.status(400).send(error)
    }
  })
}