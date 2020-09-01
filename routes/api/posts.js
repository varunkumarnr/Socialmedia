const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [auth, [check("text", "text is required in a post").not().notEmpty()]],
  async (req, res) => {
    // @route Post api/posts
    // @desc create a post
    //@access private;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    }
    res.send("post routes");
  }
);
module.exports = router;
