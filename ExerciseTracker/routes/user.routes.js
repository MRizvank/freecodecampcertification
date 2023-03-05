const express=require('express')
const UserModel=require('../model/usermodel')
const userRoutes=express.Router();

userRoutes.post('/users',async(req,res)=>{
    const username=req.body.username
    const user= new UserModel({username,count:0})
    await user.save()
    res.json({
      username:user.username,
      _id:user._id
    })
  
  })
  
  userRoutes.get('/users',async(req,res)=>{
   const users= await UserModel.find()
    res.json(users)
  })
  
  userRoutes.post('/users/:_id/exercises',async(req,res)=>{
    const {description}=req.body;
    const duration=parseInt(req.body.duration)
    const id=req.params._id;
    const dt=req.body.date;
    const date=req.body.date ? new Date(dt).toDateString():new Date().toDateString()
  
    const exercise={
      description,
      duration,
      date
    }
    await UserModel.findByIdAndUpdate(id,{
      $push:{log:{description,duration,date}},
      $inc:{count:1}})
    const user=await UserModel.findById(id)
    const updatedExercise={
      username:user.username,
      _id:id,
      ...exercise
    };
    res.json(updatedExercise)
  })
  userRoutes.get('/users/:_id/logs',async(req,res)=>{
    const id=req.params._id;
    const { from, to, limit } = req.query
    const user=await UserModel.findById(id);
  console.log(from,to,limit)
    if(from&&to){
      const logs=user.log;
      const filteredLogs = logs.filter(log => {let logDate = (new Date(log.date)).toISOString().split('T')[0]
      return logDate >= from && logDate <= to
    });
      user.log=filteredLogs
    }
    if(limit==1){
      user.log=user.log.slice(0,1)
    }
    res.json(user)
  });

  module.exports=userRoutes