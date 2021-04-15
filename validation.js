const Joi = require("joi");
const bcrypt = require("bcrypt");
const Users = require("./Models/userModel");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

// Login Validation for User
const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(5).required(),
  });

  //   Validation User
  const { error } = schema.validate(req.body);
  if (error) return res.send({ error: error.details[0].message });

  //   Checking Duplicate Email
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.send({ error: "User not found try again" });

  //   Checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send({ message: "Invalid Password" });

  //   Create and assign a token
  const token = jwt.sign({ user }, keys.token.TOKEN_SECRET);
  req.token = token;
  req.user ={
    _id: user._id,
    name: user.name,
    email: user.email
  };
  next();
};

// Register Validation for Users
const registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(5).required(),
    name: Joi.string()
  });
  //   Validating User
  const { error } = schema.validate(req.body);
  if (error) return res.send({ error: error.details[0].message });

  // Checking Duplicate Email
  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist) return res.send({ error: "Email already exist" });

  // Hashing Password
  const salt = await bcrypt.genSalt(8);
  const hashpwd = await bcrypt.hash(req.body.password, salt);

  const user = new Users({
    email: req.body.email,
    password: hashpwd,
    name: req.body.name
  });
  try {
    req.user = await user.save();
    delete req.user.password;
    next();
  } catch (error) {
    return res.send(500);
  }
};

const createToDos = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(5).required(),
    role: Joi.string(),
    status: Joi.string(),
  });
  //   Validating User
  const { error } = schema.validate(req.body);
  if (error) return res.send({ message: error.details[0].message });
}

module.exports = { loginValidation, registerValidation, createToDos };