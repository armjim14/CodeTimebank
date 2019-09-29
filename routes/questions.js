const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");

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
  ],
  async (req, res) => {

    console.log("-----------------");
    console.log(req.body);
    console.log("-----------------");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { question, language, comfort } = req.body;

    try {

    let theQuestion = { question, language, comfort };

      db.questions.create(theQuestion).then(resp => {
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
