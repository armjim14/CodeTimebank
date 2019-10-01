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
    check("comfort", "Please provide your comfort level")
      .not()
      .isEmpty()
  ], auth,
  async (req, res) => {

    console.log("-----------------");
    console.log(req.body);
    console.log("-----------------");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { question, language, topic } = req.body;

    try {

      console.log("========================");
      console.log("========================");
      console.log(req.user)
      console.log(req.user.id)
      console.log("========================");
      console.log("========================");

    let theQuestion = { question, language, topic, solved: false, UserId: req.user.id };

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
