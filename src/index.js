import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import router from './routes/tasks.routes.js'
import cors from 'cors'
import {createHash} from 'crypto'
import jwt from 'jsonwebtoken'
import { env } from "process";
import { addSwagger } from './swagger.js'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
const allowedOrigins = ['http://localhost:3000']
const options = cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options))
app.use('/task',async (req,res,next)=>{
  const token = req.headers.token;
  if(token === undefined){
    return res.status(400).send("No autorizado")
  }else{
    try {
      
      const data = jwt.verify(token,env.SECRET)
      return next()
    } catch (error) {
      console.log('i')
      return res.status(400).send("No autorizado")
    }
  }
})

app.use("/",async (req,res)=>{
  res.send("Hola");
})

app.use(router)

const server = app.listen(3002, () =>{
  console.log('Server ready at: http://localhost:3002');
}
  
)