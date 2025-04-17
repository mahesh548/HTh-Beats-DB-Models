const mongoose = require("mongoose");
const { refineObj } = require("../../utils");
const homeSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  data: Object,
  lang: String,
});

homeSchema.pre("save", function (next) {
  this.data = refineObj(this.data);
  next();
});

module.exports = mongoose.model("home", homeSchema);
