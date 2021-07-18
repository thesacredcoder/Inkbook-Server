const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user = await User.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid email/password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid email/password");

    const token = user.generateAuthToken();
    res.send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to create your account");
  }
});

module.exports = router;
