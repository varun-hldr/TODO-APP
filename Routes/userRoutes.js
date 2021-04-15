const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = require("express").Router();
const Users = require("../Models/userModel");
const { loginValidation, registerValidation } = require("../validation");

// Verify Token
const verify = require("../verifyToken");

// Login
router.post("/login", loginValidation, async (req, res) => {
    res.json({ user: req.user, token: req.token, message: "Login Successfull" });
});

// Signup
router.post("/signup", registerValidation, async (req, res) => {
    res.send({user: req.user, message: "User Succefully registered"});
});

// Update User
router.put("/:id", verify, async (req, res) => {
  const foundUser = await Users.findById(req.params.id);
  const user = await Users.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name ? req.body.name : foundUser.name,
        password: req.body.password ? req.body.password : foundUser.password,
      },
    }
  );
  res.send({ message: "Details Updated successfully" });
});

module.exports = router;