import express from 'express'
import mongoose from 'mongoose'
import { seedDatabase } from './database/seed'
import router from './router'

const app = express()

if (import.meta.hot) {
  import.meta.hot.decline()
}

mongoose.connect(`mongodb://${process.env.MONGO_HOST ?? 'localhost'}:27017/db`).then(async () => {
  await mongoose.connection.db.dropDatabase()
  seedDatabase()
  console.log('Connected to database')
}).catch(console.error)


// TODO [#10]: Logowanie do SMTP od nodemailer
// https://nodemailer.com/about/

// export const transporter = nodemailer.createTransport({
  
//   // dane na poczte onet:
//   // host: "smtp.poczta.onet.pl",
//   // port: 465,
//   // secure: true,
//   // auth: {
//   //   user: "crewassistanthelp@op.pl",
//   //   pass: "crewAssistanthelp123", 
//   // }

//   // dane na gmaila:
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "crewassistanthelp@gmail.com",
//     pass: "crewassistanthelp123", 
//   }
// })

// async function sendEmail() {
//   let info = await transporter.sendMail({
//     from: '"Crew Assistant Help" <crewassistanthelp@gmail.com>', // sender address
//     to: "crewassistanthelp@op.pl", // list of receivers
//     subject: "Hello", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   })
  
//   console.log("Message sent: %s", info.messageId)
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
// }

// sendEmail()

app.use(express.json())
app.use("/api", router)

export const handler = app
