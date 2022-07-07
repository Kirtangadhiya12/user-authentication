const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Authentication Middelware
exports.authentication = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return errorResponse(req, res, "Token is not found", 400);
    }

    const verifyToken = authToken.split(" ")[1];

    jwt.verify(verifyToken, process.env.TOKEN_SECRET, (error, user) => {
      if (error) {
        return errorResponse(
          req,
          res,
          "you are not authorize",
          400,
          error.message
        );
      }
      req.user = user;

      next();
    });
  } catch (error) {
    return errorResponse(
      req,
      res,
      "error in authentication",
      400,
      error.message
    );
  }
};
