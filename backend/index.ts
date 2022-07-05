import express from 'express'
import mongoose from 'mongoose'

//initialized Fastify App
const app = express();

//connected fastify to mongoose
try {
  mongoose.connect('mongodb://localhost:27017/notes_db');
} catch (e) {
  console.error(e);
}

//handle root route
app.get('/api/hello', (request, reply) => {
  try{
    reply.send("Hello world!");
  } catch(e) {
    console.error(e);
  }
})

export const handler = app