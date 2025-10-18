import express, { Router } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js';
const app=express()

app.use(express.json());
dotenv.config();
mongoose.connect(process.env.MongoDb_Connection)
.then(()=>{
    console.log("Connected to db");
}).catch(err=>(console.log(err)))

app.get('/demo',(req,res)=>{
    res.send([{"msg":"As-salamu alaykum"}])
})
app.get('/',(req,res)=>{
    res.send([{"msg":"As-salamu alaykum"}])
})

app.listen(3000,(req,res)=>{
    console.log("App is Running on port 3000")
})
app.use('/api/routes', authRoute);