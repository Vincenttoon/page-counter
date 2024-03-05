const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const dateFormat = require("../utils/dateFormat");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  savedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  worms: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dates: {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Update the updatedAt field when saving
  this.dates.updatedAt = new Date();

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("savedBooksCount").get(function () {
  return this.savedBooks.length;
});

// friends list length
userSchema.virtual("wormCount").get(function () {
  return this.worms.length;
});

userSchema.virtual("reviewedBooksCount").get(function () {
    return this.reviews.length;
  });


const User = mongoose.model("User", userSchema);

module.exports = User;
