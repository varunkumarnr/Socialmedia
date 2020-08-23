const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  // @route Get api/profile
  // @desc
  //@access public
  res.send("profile route");
});
module.exports = router;
