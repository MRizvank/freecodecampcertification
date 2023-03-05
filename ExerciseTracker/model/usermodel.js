const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
      type:String,
      required:true
    },
    log:[{
    date:String,
    description:String,
    duration:Number
    }],
    count:Number
  });
  const UserModel=mongoose.model('user',userSchema)

  module.exports=UserModel