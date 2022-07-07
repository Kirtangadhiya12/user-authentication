const Joi = require("joi");

const validation = Joi.object({
  name: Joi.string().trim(true).required(),
  number: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim(true).required(),
  image: Joi.string().required(),
  DOB: Joi.date().raw().required(),
  gender: Joi.string().trim(true).required(),
});

const uservalidation = async (req, res, next) => {
  const { name, number, email, DOB, gender, password } = req.body;
  const { filename } = req.file;
  const payload = {
    name,
    number,
    email,
    password,
    image: filename,
    DOB,
    gender,
  };

  const { error } = validation.validate(payload);
  if (error) {
    return errorResponse(req, res, "Validation error.", 400, error.message);
  }
  next();
};

module.exports = { uservalidation };
