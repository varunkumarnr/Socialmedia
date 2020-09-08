const express = require("express");
const router = express.Router();
const axios = require("axios");
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const { response } = require("express");
router.get("/me", auth, async (req, res) => {
  // @route Get api/profile/me
  // @desc Get user profile based on received token
  //@access private
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
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
      profileFields.skills = skills
        .toString()
        .split(",")
        .map((skill) => " " + skill.trim());
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
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "There are no profiles" });
  }
});
//@route GET api/profile/user/:user_id
//@desc Get profile using id
//@access Public
router.get(
  "/user/:user_id",

  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate("user", ["name", "username", "avatar"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }
);
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
    //remove posts
    await Post.deleteMany({ user: req.user.id });
    //rempve profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json("Removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
//@desc Add profile education
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
//@route delete api/profie/education/:edu_id
//@desc delete profile education
//@acess Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("404 something went wrong:(");
  }
});
//@route add api/profile/project
//@desc add projects
//@access Private
router.put(
  "/project",
  [
    auth,
    [
      check("projectname", "project title is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      projectname,
      projectlink,
      from,
      to,
      current,
      projectdesc,
    } = req.body;
    const newproject = {
      projectname,
      projectlink,
      from,
      to,
      current,
      projectdesc,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.projects.unshift(newproject);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(400).send("Somthing went wrong try again");
    }
  }
);
//@route delete  api/profile/project/:project_id
//@desc delete projects
//@access Private
router.delete("/project/:project_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.projects
      .map((item) => item.id)
      .indexOf(req.params.project_id);
    profile.projects.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("404 something went wrong:(");
  }
});
//@route get api/profile/github/:githubusername
//@desc get github repositories
//access public
router.get("/github/:githubusername", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.githubusername
      }/repos?per_page=5$sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: "No github profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
