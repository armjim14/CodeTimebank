const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");

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

    console.log("i am outside does nodemon work");
    console.log("i am outside does nodemon work");
    console.log("i am outside does nodemon work");
    console.log("i am outside does nodemon work");
    console.log("i am outside does nodemon work");

    try {

      console.log("i am here")

    let theQuestion = { question, language, topic, solved: false, UserId: req.user.id };

    console.log(theQuestion);

      db.questions.create(theQuestion).then(resp => {
        console.log("it works");
        console.log(resp)
        return res.send(resp);
      });

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

module.exports = router;
