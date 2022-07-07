const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email: {
        type: String,
        required: true,
        
      },
      password:{
        type:String,
        required:true,
        max:1024,
        min:5
      },
      image:{
        type:String,
        required:true
        
      },
      DOB:{
        type:Date,
        required:true
      },
      gender:{
        type:String,
        required:true
      }


})

module.exports = mongoose.model("User",userSchema);