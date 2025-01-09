const mongoose = require("mongoose");

const entitySchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: String,
  header_desc: String,
  perma_url: String,
  type: { type: String, required: true },
  image: { type: String, required: true },
  language: String,
  year: String,
  play_count: String,
  list_count: String,
  idList: [String],
  list: Array,
  more_info: Object,
  userId: [String],
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

entitySchema.pre("save", function (next) {
  /* This function will always run before database save anything to collection */
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("entity", entitySchema);
