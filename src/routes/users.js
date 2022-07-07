const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { uservalidation } = require("../controller/user.validation");
const upload = require("../utils/fileUpload");

const {
  registerUser,
  loginUser,
  allUser,
  getUser,
} = require("../controller/user.controller");

router.get("/", allUser);
router.get("/profile", verifyToken.authentication, getUser);
router.post("/register", upload, uservalidation, registerUser);
router.post("/login", loginUser);

module.exports = router;
