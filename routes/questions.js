const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");

router.post(
  "/add/question",
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { question, language, comfort } = req.body;

    try {

    let theQuestion = { question, language, comfort };

      db.question.create(theQuestion).then(resp => {
        console.log(resp)
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server malfunction");
    }
  }
);

module.exports = router;
