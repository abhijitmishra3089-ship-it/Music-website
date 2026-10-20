import 'dotenv/config';
import express from 'express'
const app=express()
import connectDb from './config/db.js';
connectDb();
app.get("/health",(req,res)=>{
    res.send("server is live")
})


const PORT=process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`server is live on port ${PORT}`)
})