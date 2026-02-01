const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", PostSchema);

