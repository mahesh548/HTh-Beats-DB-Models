const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  id: {
    type: String,
    minLength: 10,
    required: true,
  },
  username: { type: String, required: true, minLength: 5, maxLength: 30 },
  email: { type: String, required: true, minLength: 10 },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  otp: { type: Number, min: 1000, max: 9999 },
  verified: { type: Boolean, default: false },
  session: { type: String, default: null },
  downloadAccess: {
    type: String,
    enum: ["default", "requested", "approved"],
    default: "default",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  pic: {
    type: String,
    default: function () {
      const username = this.username || "HTh";
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        username
      )}&bold=true&background=f5deb3&length=1&font-size=0.6`;
    },
  },
  languages: { type: [String], default: ["hindi"] },
  cloudinaryPublicId: String,
  cloudinaryVersion: String,
});

module.exports = mongoose.model("user", usersSchema);
