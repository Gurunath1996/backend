const mongoose=require('mongoose')
const {Register, validateUser}=require('../models/register')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const lodash = require('lodash')
const express =require('express')
const router=express.Router()

router.post('/', async (req,res)=>{
    const result= validateUser(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } 
    try{
    let register= await Register.findOne({email:req.body.email})
    if(register) return res.status(400).send('Email already exists')

    register= new Register(lodash.pick(req.body,["fname","lname","email","password","role","dept","dob","jdate"]))
    const salt= await bcrypt.genSalt(10)
    register.password= await bcrypt.hash(register.password,salt)
    register=await register.save()

    const token = jwt.sign({_id: register._id, role: register.role },'verySecreate')
    res.header('x-auth-token',token).send(lodash.pick(register,["fname","fname","email","role","dept","dob","jdate"]))
    }
    catch(err){res.send(err.errors.role.message)}
    
    
})

router.get('/',[auth,admin], async (req,res)=>{
    const register= await Register.find()
    res.send(register)
})

module.exports=router