const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(
      _.pick(req.body, ["name", "username", "email", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "username", "email"]));
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to create your account");
  }
});

module.exports = router;
