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
});

module.exports = mongoose.model("entity", entitySchema);
