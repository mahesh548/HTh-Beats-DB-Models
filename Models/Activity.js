const mongoose = require("mongoose");
const utils = require("../../utils");

const activities = ["saved", "played"];
const activityOf = ["entity", "artist", "private", "collab", "song"];
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
  idList: [String],
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});
activitySchema.statics.saveLog = function (data) {
  const { userId, activity, id, type, idList } = data;
  const activeData = this.findOne({
    userId: userId,
    activity: activity,
    id: id,
    type: type,
  });
  const timeDiff = utils.dura(activeData.createdAt);
  if (activeData && timeDiff <= 24) {
    if (type == "song") {
      return true;
    } else {
      const oldList = activeData.idList.filter(
        (item) => !idList.includes(item)
      );
      activeData.idList = [...idList, ...oldList];
      activeData.save();
      return true;
    }
  } else {
    if (type == "song") {
      const newActivity = new this({
        userId: userId,
        activity: activity,
        id: id,
        type: type,
      });
      newActivity.save();
      return true;
    } else {
      const newActivity = new this({
        userId: userId,
        activity: activity,
        id: id,
        type: type,
        idList: idList,
      });
      newActivity.save();
      return true;
    }
  }
};
module.exports = mongoose.model("activity", activitySchema);
