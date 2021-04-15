const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = require("express").Router();
const Groups = require("../Models/groupModel");
const { loginValidation, registerValidation } = require("../validation");

// Verify Token
const verify = require("../verifyToken");

router.get("/", verify, async (req, res) => {
    const groups = await Groups.find({user: req.user.user._id});
    res.json({ groups });
});


router.post("/", verify, async (req, res) => {
    console.log("=====>",req.user);
    const existing = await Groups.findOne({user: req.user.user._id, name: req.body.name });
    if(existing) return res.send({error: "Group with same name already exists"})
    
    const group = await new Groups({name: req.body.name, user: req.user.user._id}).save();
    res.json({ group, messsage: "Group created"});
});

// Signup
router.put("/:id", verify, async (req, res) => {
    const existing = await Groups.findOne({_id: req.params.id, user: req.user.user._id });
    if(!existing) return res.send({error: "Group does not exists"})

    const group = await Groups.updateOne({_id: req.params.id},{name: req.body.name});
    res.json({ messsage: "Group details updated"});
});


module.exports = router;