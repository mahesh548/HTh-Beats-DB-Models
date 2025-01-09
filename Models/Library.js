const mongoose = require("mongoose");

const entityTypes = ["entity", "artist", "private", "collab"];
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
  /* This function will always run before database save anything to collection */
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
