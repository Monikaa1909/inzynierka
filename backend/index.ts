import express from 'express'
import mongoose from 'mongoose'
import { seedDatabase } from './database/seed'
import router from './router'

const app = express()

if (import.meta.hot) {
  import.meta.hot.decline()
}

mongoose.connect('mongodb://localhost:27017/db').then(async () => {
  await mongoose.connection.db.dropDatabase()
  seedDatabase()
  console.log('Connected to database')
}).catch(console.error)

// TODO [#10]: Logowanie do SMTP od nodemailer
// https://nodemailer.com/about/

app.use(express.json())
app.use("/api", router)

export const handler = app
