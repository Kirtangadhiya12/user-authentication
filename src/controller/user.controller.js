const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("../helper/index");

exports.registerUser = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return errorResponse(req, res, "Email already exist", 404);

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const { name, number, email, DOB, gender } = req.body;
  const { filename } = req.file;
  const payload = {
    name,
    number,
    email,
    password: hashedPassword,
    image: filename,
    DOB,
    gender,
  };

  try {
    const user = await User.create(payload);
    return successResponse(req, res, "user added successfully", {}, 201);
  } catch (error) {
    return errorResponse(req, res, 404, error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return errorResponse(req, res, "Invalid Credentials", 404);
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return errorResponse(req, res, "Invalid Credentials", 404);

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return successResponse(
      req,
      res,
      "User Logged in  successfully",
      { Token: token },
      201
    );
  } catch (error) {
    return errorResponse(req, res, 404, error.message);
  }
};

exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    return successResponse(
      req,
      res,
      "User Data fetched Successfully",
      { users },
      201
    );
  } catch (error) {
    return errorResponse(req, res, 404, error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return successResponse(
      req,
      res,
      "User Profile fetched Successfully",
      { user },
      201
    );
  } catch (error) {
    return errorResponse(req, res, 404, error.message);
  }
};
