import express from 'express'
import mongoose from 'mongoose'
import { seedDatabase } from './database/seed'
import router from './router'

const app = express()

mongoose.connect('mongodb://localhost:27017/db').then(async () => {
  await mongoose.connection.db.dropDatabase()
  seedDatabase()
  console.log('Connected to database')
}).catch(console.error)

app.use("/api", router)

export const handler = app
