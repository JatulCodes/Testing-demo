const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  location: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
  Password: {
    type: String,
    required: true,
  },
  CPassword: {
    type: String,
    required: true,
  },
  checkbox: {
    type: Boolean,
    required: false,
  },
  pending: [
    {
      status: {
        type: Boolean,
      },
      pendingUser: {
        type: String,
      },
    },
  ],
  connected: [
    {
      status: {
        type: Boolean,
      },
      connectedUser: {
        type: String,
      },
    },
  ],
});
const SignUpData = mongoose.model("SignUpData", userSchema);
module.exports = SignUpData;
