const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const auth = require("../middleware/auth");
const config = require("config");
var Op = require("sequelize").Op;
var nodemailer = require("nodemailer");

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
      attributes: ["github", "discord", "skype", "id", "hirable", "isAdmin"]
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
    check("name", "Please enter a valid email").isEmail(),
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
    const {
      name,
      password,
      github,
      discord,
      skype,
      hirable,
      securityAnswer,
      securityQuestion
    } = req.body;

    try {
      let user = await db.Users.findOne({ where: { username: name } });
      if (user) {
        return res.status(400).json({ msg: "Username taken!" });
      }
      let githubFinder = await db.Users.findOne({ where: { github: github } });
      if (githubFinder) {
        return res.status(400).json({ msg: "Github username already in use!" });
      }
      user = {
        username: name,
        password: password,
        github: github,
        discord: discord,
        skype: skype,
        credits: 0,
        hirable,
        securityAnswer,
        securityQuestion
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
      { where: { id: req.user.id }, attributes: [] }
    );
    res.status(200).json(update);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});
// updating contact information
router.put("/", auth, async (req, res) => {
  const { discord, github, skype, hirable } = req.body;
  try {
    const update = await db.Users.update(
      { discord, github, skype, hirable },
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
  try {
    const resp = await db.Users.findOne({ where: { id: req.params.id } });
    res.json(resp);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

router.get("/except", auth, async (req, res) => {
  console.log("\n\n" + req.user.id + "\n\n");
  try {
    console.log("\n I am in here \n");
    const resp = await db.Users.findAll({
      where: {
        id: {
          [Op.not]: req.user.id
        }
      }
    });
    console.log("-------------------");
    console.log(resp);
    console.log("-------------------");
    res.json(resp);
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

router.get("/forgot/:username", async (req, res) => {
  console.log(req.params.username);
  try {
    const resp = await db.Users.findOne({
      where: { username: req.params.username }
    });
    res.json(resp);
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

router.put("/reset/password", async (req, res) => {
  console.log(req.body);
  try {
    let { id, password, email, github } = req.body;

    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    db.Users.update(
      {
        password
      },
      {
        where: {
          id
        }
      }
    );
    console.log("Info Updated");

    await sendEmail(email, github);

    res.status(200).send({ msg: "Email send" });
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

function sendEmail(email, username) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
      user: process.env.email,
      pass: process.env.password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let HelperOptions = {
    from: `${process.env.email}`,
    to: `${email}`,
    subject: `From: ${process.env.email}`,
    text: `Hello ${username}, There has been a change to your account`
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
  });
}
