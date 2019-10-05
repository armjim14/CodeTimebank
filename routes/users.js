const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const auth = require("../middleware/auth");
const config = require("config");

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await db.Users.findOne({ where: { id: req.user.id } });
    res.json(user);
    // console.log(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userInfo = await db.Users.findOne({
      where: { id: req.user.id },
      attributes: ["github", "discord", "skype", "credits", "id"]
    });
    res.json(userInfo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/login",
  [
    check("username", "Please include your username")
      .not()
      .isEmpty(),
    check("password", "Password required")
      .not()
      .isEmpty()
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

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
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
      .isEmpty(),
    check("skype", "Please enter a Skype username")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, password, github, discord, skype } = req.body;

    try {
      let user = await db.Users.findOne({ where: { username: name } });
      if (user) {
        return res.status(400).json({ msg: "Username taken!" });
      }
      user = {
        username: name,
        password: password,
        github: github,
        discord: discord,
        skype: skype,
        credits: 0
      };

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      db.Users.create(user).then(resp => {
        const payload = {
          user: { id: resp.id }
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server malfunction");
    }
  }
);

//changing password
router.put("/password", auth, async (req, res) => {
  let { password, oldPassword } = req.body;
  try {
    let user = await db.Users.findOne({ where: { id: req.user.id } });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const update = await db.Users.update(
      { password },
      { returning: true, where: { id: req.user.id } }
    );
    res.status(200).json(update);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});
// updating contact information
router.put("/", auth, async (req, res) => {
  const { discord, github, skype } = req.body;
  try {
    const update = await db.Users.update(
      { discord, github, skype },
      { returning: true, where: { id: req.user.id } }
    );
    res.json(update);
    // console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/50users", async (req, res) => {
  try {
    const resp = await db.Users.findAll();
    res.json(resp);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  console.log("=================");
  console.log("=================");
  console.log(req.params.id);
  console.log("=================");
  console.log("=================");
  try {
    const resp = await db.Users.findOne({ where: { id: req.params.id } });
    res.json(resp);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
