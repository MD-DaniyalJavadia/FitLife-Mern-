import express from 'express'
import bcrypt from 'bcrypt'
import User from '../Models/Users.js';

const router =express.Router();

router.post('/register',async(req,res)=>{
    const {UserName,UserEmail,UserPassword}=req.body
    const hashed=await bcrypt.hash(UserPassword,10)
    const newUser = new User({UserName,UserEmail,UserPassword:hashed});
    await newUser .save();
    res.status(201).send("User Registerd Successfully!!")
})

export default router;