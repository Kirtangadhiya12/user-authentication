const express=require('express');
const router = express.Router()
const User=require('../models/user');
const verifyToken=require('../middleware/verifyToken');
const {uservalidation}=require('../controller/user.validation');
const multer=require('multer');

const {registerUser,loginUser,allUser,getUser}=require('../controller/userController');

const storage=multer.diskStorage({
  destination:(req,file,callback)=>{callback(null,'uploads')},
  filename:(req,file,callback)=>{callback(null,file.fieldname + "_" + file.originalname)}
})

const upload=multer({
  storage:storage,
}).single("image");

router.get('/',allUser);
router.get('/profile',verifyToken.authentication,getUser);
router.post('/register',upload,uservalidation,registerUser);
router.post('/login',loginUser);



module.exports = router;