const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
router.post(
  "/",
  [auth, [check("text", "text is required in a post").not().notEmpty()]],
  async (req, res) => {
    // @route Post api/posts
    // @desc create a post
    //@access private;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error cannot post");
    }
    res.send("post routes");
  }
);
module.exports = router;
