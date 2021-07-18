const express = require("express");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, (Req, res, next) => {
  res.send("<p>This is the homepage</p>");
});

module.exports = router;
