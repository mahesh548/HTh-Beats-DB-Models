const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  admin: { type: String, required: true },
  title: { type: String, required: true },
  blocked: [String],
  createdAt: String,
  expiredAt: String,
  id: String,
});
module.exports = mongoose.model("room", RoomSchema);
