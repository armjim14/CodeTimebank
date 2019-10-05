const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../models");
const auth = require("../middleware/auth");
var Op = require("sequelize").Op;

router.post("/test", auth, async (req, res) => {
    const { ids, info } = req.body;
    console.log(req.body);
    console.log(ids);
    console.log(info);
    // db.time.update
    res.json({msg: "sucsess"})
})

module.exports = router;