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
  async (req, res) => {
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
      bio,
      skills,
      githubusername,
      youtube,
      twitter,
      github,
      linkedin,
      instagram,
    } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (age) {
      profileFields.age = age;
    }
    if (location) {
      profileFields.location = location;
    }
    if (status) {
      profileFields.status = status;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    //build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (github) profileFields.social.github = github;
    if (linkedin) profileFields.social.linkdein = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    //console.log(profileFields.skills);
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error1");
    }
  }
);
//@route GET api/profile
//@desc Get all  profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "name",
      "username",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});
//@route GET api/profile/user/:user_id
//@desc Get profile using id
//@access Public
router.get("/user/:user_id", async (req, res) => {
  //console.log(req.params.user_id);
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "username", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "404 profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "404 profile not found" });
    }
    return res.status(500).send("server error");
  }
});
//@route GET api/profile/user/:username
//@desc Get profiles using username
//@access Public
router.get("/user/:username", async (req, res) => {
  console.log(req.params.username);
  try {
    const profile = await Profile.findOne({
      user: req.params.username,
    }).populate("user", ["name", "username", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "404 profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "404 profile not found" });
    }
    return res.status(500).send("server error");
  }
});
//@route Delete api/profile
//@desc Delete profile ,post , user
//@access private
router.delete("/", auth, async (req, res) => {
  try {
    //rempve profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json("Removed");
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

//@route PUT api/profie/experience
//@desc Add profile experience
//@acess Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
//@route Delete api/profie/experience
//@desc Delete profile experience
//@acess Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("404 something went wrong:(");
  }
});
//@route PUT api/profie/education
//@desc Add profile experience
//@acess Private
router.put(
  "/education",
  [
    auth,
    [
      check("University", "university is required").not().isEmpty(),
      check("Degreefield", "enter field of study").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      University,
      Degreefield,
      from,
      to,
      current,
      description,
      GPA,
    } = req.body;
    const newedu = {
      University,
      Degreefield,
      from,
      to,
      current,
      description,
      GPA,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newedu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("something went wrong");
    }
  }
);
module.exports = router;
