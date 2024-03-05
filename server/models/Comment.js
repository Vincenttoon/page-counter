const mongoose = require("mongoose");
const { Schema } = mongoose;
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  booksRead: {
    type: Schema.Types.ObjectId,
    ref: "BooksRead",
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
