const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  authors: [
    {
    type: String,
  },
],
  description: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
