const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
var Op = require("sequelize").Op;

router.post("/test", auth, async (req, res) => {
    const { id, number } = req.body;
    console.log(req.body);
    console.log(id);
    console.log(number);
})

module.exports = router;