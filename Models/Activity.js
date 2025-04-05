const mongoose = require("mongoose");
const utils = require("../../utils");
require("../Models/Song");

const activities = ["saved", "played", "created", "joined"];
const activityOf = ["entity", "artist", "song", "search"];
const activitySchema = mongoose.Schema({
  userId: { type: String, required: true },
  activity: {
    type: String,
    required: true,
    validator: {
      validate: (value) => activities.includes(value),
      message: (props) => `${props.value} is not a valid activity.`,
    },
  },
  type: {
    type: String,
    validator: {
      validate: (value) => activityOf.includes(value),
      message: (props) => `${props.value} is not a valid activity.`,
    },
  },
  id: String,
  idList: { type: [String], default: [] },
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
activitySchema.statics.saveLog = async function (data) {
  const { userId, activity, id, type, idList } = data;
  const activeData = await this.findOne({
    userId: userId,
    activity: activity,
    id: id,
    type: type,
  });
  const timeDiff =
    activeData && !utils.isDifferentDay(Date.now(), activeData.createdAt);
  if (timeDiff) {
    if (type != "song") {
      const oldList = activeData.idList.filter(
        (item) => !idList.includes(item)
      );
      activeData.idList = [...idList, ...oldList];
    }
    activeData.updatedAt = Date.now();
    await activeData.save();
    return true;
  } else {
    if (type == "song") {
      const newActivity = await new this({
        userId: userId,
        activity: activity,
        id: id,
        type: type,
      });
      await newActivity.save();
      return true;
    } else {
      const newActivity = await new this({
        userId: userId,
        activity: activity,
        id: id,
        type: type,
        idList: idList,
      });
      await newActivity.save();
      return true;
    }
  }
};

const refAndField = {
  artist: { ref: "artist", foreignField: "artistId" },
  entity: { ref: "entity", foreignField: "id" },
  private: { ref: "entity", foreignField: "id" },
  collab: { ref: "entity", foreignField: "id" },
  song: { ref: "song", foreignField: "id" },
  search: { ref: "song", foreignField: "id" },
};

activitySchema.virtual("data", {
  ref: (doc) => {
    return refAndField[doc.type].ref;
  },
  localField: "id",
  foreignField: (doc) => {
    return refAndField[doc.type].foreignField;
  },
  justOne: true,
});
activitySchema.virtual("list", {
  ref: "song",
  localField: "idList",
  foreignField: "id",
  justOne: false,
});

// Enable virtuals in JSON output
activitySchema.set("toObject", { virtuals: true });
activitySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("activity", activitySchema);
