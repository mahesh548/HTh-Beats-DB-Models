const mongoose = require("mongoose");

const entityTypes = ["entity", "artist", "song"];
const Library = mongoose.Schema({
  userId: { type: [String], required: true },
  id: { type: String, required: true },
  type: {
    type: String,
    validate: {
      validator: function (value) {
        return entityTypes.includes(value);
      },
      message: (props) => `${props.value} is not valid entity types.`,
    },
  },
  owner: String,
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

Library.virtual("data", {
  ref: (doc) => doc.type,
  localField: "id",
  foreignField: (doc) => {
    return doc.type == "entity" ? "id" : "artistId";
  },
  justOne: true,
});

// Enable virtuals in JSON output
Library.set("toObject", { virtuals: true });
Library.set("toJSON", { virtuals: true });

module.exports = mongoose.model("library", Library);
