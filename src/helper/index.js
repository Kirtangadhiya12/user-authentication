//success response
module.exports.successResponse = (req, res, message, data, code = 200) =>
  res.status(code).json({
    message,
    data,
    success: true,
  });

//error response
module.exports.errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(code).json({
    errorMessage,
    error,
    success: false,
  });
