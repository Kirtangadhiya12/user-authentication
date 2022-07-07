const User=require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser=async(req,res)=>{
 
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");
  
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const { name,number,email,DOB,gender}=req.body;
      const {filename}=req.file;
      const payload={
          name,
          number,
          email,
          password:hashedPassword,
          image:filename,
          DOB,
          gender
      }
    
      try{
          const user= await User.create(payload);
          const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
          
  
          res.status(201).json({
           Data:user,
           Token:token,
           message:"user added successfully"
          })
          
  
      }catch(error){
        res.status(400).json({
            error
          })
      }
  
  }

  exports.loginUser=async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json({
        message:"Invalid Credentials"
      })
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).json({
        message:"Invalid Credentials"
      })
  
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.status(201).json({
        "Token":token,
       "message":"user logged in successfully"
       })
     
      
      
    } catch (error) {
      res.status(400).json({
        error
      })
    }
  }

  exports.allUser=async(req,res)=>{
    try{
 const users=await User.find();
 res.json(users);
    }
    catch(error){
        res.status(400).json({
            error
          })
    }
}

exports.getUser=async(req,res)=>{
    try{
        console.log(req.user);
        // const id = req.user
  const user=await User.findById(req.user._id);
  res.json(user);
    }
    catch(error){
        res.status(400).json({
            error
          })
    }
  }

  
  