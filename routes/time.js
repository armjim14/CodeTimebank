const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
var Op = require("sequelize").Op;

router.post("/test", auth, async (req, res) => {
    const { ids, info, qId } = req.body;
    console.log(req.user.id)
    let data = [];
    let counter = 0;

    for (let e in info) {
        let temp = {
            UserId: ids[e],
            questionId: qId,
            Time: info[e].hours
        }
        counter -= info[e].hours;
        data.push(temp)
    }

    let forUser = {
        UserId: req.user.id,
        questionId: qId,
        Time: counter
    }

    data.push(forUser);
    console.log(data);
    console.log(counter);

    await db.time.bulkCreate(data)

    await db.questions.update({
        solved: true
    },
        {
            where: {
                id: qId
            }
        }
    )

    res.json({ msg: "completed" })
})

router.get("/currentUser", auth, async (req, res) => {
    const resp = await db.time.findAll({
        where: {
            UserId: req.user.id
        }
    })

    res.json(resp);
})

router.get("/user/:id", async (req, res) => {
    const resp = await db.time.findAll({ where: { UserId: req.params.id }, include: [db.Users] })
    res.json(resp)
})

module.exports = router;