const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  // @route Get api/posts
  // @desc
  //@access public;

  res.send("post routes");
});
module.exports = router;
