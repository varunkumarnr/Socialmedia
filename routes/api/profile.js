const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
router.get("/me", auth, async (req, res) => {
  // @route Get api/profile/me
  // @desc Get user profile based on received token
  //@access private
  try {
    const profile = await Profile.findOne({
      user: req.user.Id,
    }).populate("user", ["name", "username", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "404 user not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      age,
      location,
      status,
      skills,
      githubusername,
      youtube,
      twitter,
      github,
      linkdein,
      instagram,
    } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
  }
);
module.exports = router;
