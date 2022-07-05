import express from 'express'
import mongoose from 'mongoose'
import router from './router'

//initialized Fastify App
const app = express();

//connected fastify to mongoose
try {
  mongoose.connect('mongodb://localhost:27017/db');
} catch (e) {
  console.error(e);
}

app.use("/api", router)

export const handler = app