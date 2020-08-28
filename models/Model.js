const mongoose = require("mongoose");
const ProfieSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: user,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  age: {
    type: Date,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  Skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: Boolean,
      },
    },
  ],
  education: [
    {
      University: {
        type: String,
        required: true,
      },
      Degreefield: {
        type: String,
        required: type,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      GPA: {
        type: String,
      },
    },
  ],
  projects: [
    {
      projectname: {
        type: String,
        required: true,
      },
      projectlink: {
        type: String,
      },
      projectdesc: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    github: {
      type: String,
    },
    linkdein: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});
module.exports = mongoose.model("profile", ProfieSchema);
