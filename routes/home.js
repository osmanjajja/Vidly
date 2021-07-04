const express = require("express");
const router = express.Router();

// Read request.
router.get("/", (req, res) => {
  res.send("Welcome to Vidly App.");
});

module.exports = router;
