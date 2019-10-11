const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
var Op = require("sequelize").Op;

router.get("/getFollowers", auth, async (req, res) => {
    try {
        const resp = await db.followers.findAll({
            where: {
                UserId: req.user.id
            }
        })
        res.json(resp);
    } catch(e) {
        res.status(500).send("nope")
    }
})

router.post("/add", auth, async (req, res) => {
    console.log(req.body)
    try {
        await db.followers.create({followerId: req.body.id, UserId: req.user.id})
        res.json({msg: "You added a new follower"})
    } catch(e){
        res.status(500).send("nope")
    }
})

router.delete("/delete/:id", auth, async (req, res) => {
    console.log("---------------------------")
    console.log(req.params.id);
    console.log(req.user.id)
    console.log("---------------------------")
    try {
        const resp = await db.followers.destroy({
            where:{
                UserId: req.user.id,
                followerId: req.params.id
            }
        })
        console.log(resp)
        res.json(resp)
    } catch(e) {
        res.status(500).send("nope")
    }
})

module.exports = router;