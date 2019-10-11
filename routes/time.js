const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
var Op = require("sequelize").Op;

router.post("/test", auth, async (req, res) => {
  const { ids, info, qId } = req.body;
  console.log(req.user.id);
  let data = [];
  let counter = 0;

  for (let e in info) {
    let temp = {
      UserId: ids[e],
      questionId: qId,
      Time: info[e].hours
    };
    counter -= info[e].hours;
    data.push(temp);
  }

  let forUser = {
    UserId: req.user.id,
    questionId: qId,
    Time: counter
  };

  data.push(forUser);
  console.log(data);
  console.log(counter);

  await db.time.bulkCreate(data);

  await db.questions.update(
    {
      solved: true
    },
    {
      where: {
        id: qId
      }
    }
  );

  res.json({ msg: "completed" });
});

router.get("/currentUser", auth, async (req, res) => {
  const resp = await db.time.findAll({
    where: {
      UserId: req.user.id
    }
  });

  res.json(resp);
});

router.get("/user/:id", async (req, res) => {
  const resp = await db.time.findAll({
    where: { UserId: req.params.id },
    include: [
      {
        model: db.Users,
        attributes: { exclude: ["password"] }
      }
    ]
  });
  res.json(resp);
});

router.get("/", auth, async (req, res) => {
  const resp = await db.Users.findOne({ where: { id: req.user.id } });
  if (resp.isAdmin === false || resp.isAdmin === null) {
    return res.status(400).send("Not an admin");
  }

  try {
    const trueResp = await db.time.findAll({
      include: [{ model: db.Users }, { model: db.questions }]
    });
    return res.status(200).json(trueResp);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Ruh Roh!");
  }
});

router.post("/adjust", auth, async (req, res) => {
  const resp = await db.Users.findOne({ where: { id: req.user.id } });
  if (resp.isAdmin === false || resp.isAdmin === null) {
    return res.status(400).send("Not an admin");
  }

  try {
    console.log(req.body);
    const { userid, credits } = req.body;
    const trueResp = await db.time.create({
      UserId: userid,
      questionId: null,
      Time: credits
    });
    return res.status(200).json(trueResp);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Ruh roh!");
  }
});

module.exports = router;
