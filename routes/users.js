const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const auth = require("../middleware/auth");

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await db.Users.findOne({ where: { id: req.user.id } });
    res.json(user);
    console.log(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/login",
  [
    check("name", "Please include your username").exists(),
    check("password", "Password required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await db.Users.findOne({ where: { username: username } });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/register",
  [
    check(
      "name",
      "Please make sure your username is at least two characters long."
    ).isLength({ min: 2 }),
    check("password", "Please enter a password")
      .not()
      .isEmpty(),
    check("github", "Please enter your Github username")
      .not()
      .isEmpty(),
    check("discord", "Please enter your Discord username")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, password, github, discord } = req.body;

    try {
      let user = await db.Users.findOne({ where: { username: name } });
      if (user) {
        return res.status(400).json({ msg: "Username taken!" });
      }
      user = {
        username: name,
        password: password,
        github: github,
        discord: discord
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      db.Users.create(user).then(resp => {
        const payload = {
          user: { id: resp.id }
        };
        jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server malfunction");
    }
  }
);

module.exports = router;
