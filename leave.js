const {Leave, validateLeave}=require('../models/leave')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
const lodash = require('lodash')
const express =require('express')
const router=express.Router()


router.get('/',[auth,admin], async (req,res)=>{
    const leave= await Leave.find()
    res.send(leave)
})

router.get('/:id',[auth,admin], async (req,res)=>{
    try{
        const leave=await Leave.findById(req.params.id)
         if(!leave) res.status(404).send('The employee Id not found')  
         res.send(leave)
    }
    catch(err){res.send(err)}
})

router.post('/',auth, async (req,res)=>{
    const result= validateLeave(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    } 

    let leave= new Leave(lodash.pick(req.body,["empId","fdate","tdate","status"]))
    try{
        leave= await leave.save()
        res.send(leave)
    }
    catch(err){res.send(err)}
    
})

router.put('/:id',[auth,admin], async (req,res)=>{
    
    const leave= await Leave.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
    if(!leave) res.status(404).send('The Product Id not found')

    const result= validateLeave(req.body)
    if (result.error)  res.status(400).send(result.error.details[0].message)

    leave.status = req.body.status
       
    res.send(leave)
})

module.exports=router