const mongoose = require("mongoose");

const entityTypes = ["entity", "artist"];
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
  librarySecrate: { type: String, select: false, immutable: true },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

Library.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

Library.virtual("data", {
  ref: (doc) => {
    return doc.type == "artist" ? "artist" : "entity";
  },
  localField: "id",
  foreignField: (doc) => {
    return doc.type == "artist" ? "artistId" : "id";
  },
  justOne: true,
});

// Enable virtuals in JSON output
Library.set("toObject", { virtuals: true });
Library.set("toJSON", { virtuals: true });

module.exports = mongoose.model("library", Library);
