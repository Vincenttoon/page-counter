const mongoose = require("mongoose");
const Decimal128 = require("mongoose").Decimal128;
const { Schema } = mongoose;

const dateFormat = require("../utils/dateFormat");

const reviewSchema = new Schema({
  reviewText: {
    type: String,
    required: true,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  rating: {
    type: Decimal128,
    required: true,
    min: Decimal128,
    max: Decimal128,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
