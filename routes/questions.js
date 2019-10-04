const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
var Op = require("sequelize").Op;

router.get("/help/:lang", auth, async (req, res) => {
  try {
    
    const resp = await db.questions.findAll({
      where: {
        UserId: {
          [Op.not]: req.user.id
        },
        language: req.params.lang
      }
    })

    console.log(resp);
    res.json(resp)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server malfunction");
  }
})

router.post("/add",
  [
    check("question","Please enter a question")
     .not()
     .isEmpty(),
    check("language", "Please provide a language")
      .not()
      .isEmpty(),
    check("topic", "Please provide a topic")
      .not()
      .isEmpty()
  ], auth,
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { question, language, topic } = req.body;

    try {

    let theQuestion = { question, language, topic, solved: false, UserId: req.user.id };

      db.questions.create(theQuestion).then(resp => res.send(resp));

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server malfunction");
    }
  }
);

router.get("/get",
  async (req, res) => {
    try {
      db.questions.findAll({}).then(data => res.send(data))
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server malfunction");
    }

  }
)

router.get("/userq", auth, async (req, res) => {
  try {
    db.questions.findAll({where: { UserId: req.user.id }}).then(data => res.send(data))
  } catch(e) {
    console.log("Error: " + e)
    res.send({msg: e})
  }
})

router.get("/:id", async (req, res) => {
  try {
    const resp = await db.questions.findAll({where: {UserId: req.params.id}});
    res.json(resp)
  } catch (e) {
    console.log("Error: " + e)
    res.send({msg: e})
  }
})

module.exports = router;
