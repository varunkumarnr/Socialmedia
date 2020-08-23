const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  // @route Get api/auth
  // @desc
  //@access public
  res.send("Auth route");
});
module.exports = router;
