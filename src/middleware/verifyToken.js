const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Authentication Middelware 
exports.authentication = async (req, res, next) => {
    try { 
      const authToken = req.headers.authorization;
      console.log(req.headers.authorization)
  
      if(!authToken){
        return res.json({
            message:"Token is not found",
            error
        })
            
        
      }
  
      const verifyToken = authToken.split(' ')[1];
  
      jwt.verify(verifyToken, process.env.TOKEN_SECRET, (error, user) => {
        
        if (error) {
            return res.json({
                message:"you are not authorize",
                error
            })
        }
        req.user = user;
  
        next();
      });
    } catch (error) {
        return res.json({
            message:"error in authentication",
            error
        })
    }
  }