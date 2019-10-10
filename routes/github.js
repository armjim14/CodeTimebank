const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const resp = await axios.get(
      `https://api.github.com/users/${req.params.id}?client_id=${process.env.KEY}&client_secret=${process.env.SECRET}`
    );
    res.status(200).json(resp.data);
    console.log(resp.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

module.exports = router;
