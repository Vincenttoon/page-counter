const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check if user exists
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("reviews")
          .populate("savedBooks")
          .populate("worms");
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("reviews")
        .populate("savedBooks")
        .populate("worms");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("reviews")
        .populate("savedBooks")
        .populate("worms");
    },

    // Query all reviews through GraphQl
    reviews: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    // Query individual reviews through GraphQl
    review: async (parent, { _id }) => {
      return Review.findOne({ _id });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    writeReview: async (parent, args, context) => {
      if (context.user) {
        // Create a new review document
        const review = await Review.create({
          ...args,
          // Assign the username of the logged-in user to the review
          username: context.user.username,
        });

        // Associate the review with the user by pushing its ID to the user's reviews array
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reviews: review._id } },
          { new: true }
        );

        return review; // Return the created review
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        // Remove the review from the user's reviews array
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: reviewId } }, // Assuming reviews is the array field in the User model
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const { bookId } = input; // Assuming input contains a bookId field
        const addSavedBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookId } }, // Add bookId instead of the entire input object
          { new: true }
        ).populate("savedBooks"); // Populate the savedBooks field to fetch book details

        // Assuming savedBooks field in User model is populated with Book documents
        const savedBooks = addSavedBook.savedBooks;

        // Fetch details of each saved book
        const savedBooksDetails = await Book.find({ _id: { $in: savedBooks } });

        return savedBooksDetails;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedSavedBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId } }, // Remove the specific bookId from the savedBooks array
          { new: true }
        );
        return updatedSavedBook;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addComment: async (parent, { bookId, commentBody }, context) => {
      if (context.user) {
        // Create a new comment using the Comment model
        const newComment = new Comment({
          user: context.user._id, // Set the user reference to the logged-in user
          booksRead: bookId, // Assuming the comment is associated with a specific book
          text: commentBody,
        });

        // Save the new comment to the database
        const savedComment = await newComment.save();

        return savedComment;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        // Find the comment by its ID
        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw new Error("Comment not found");
        }

        // Check if the logged-in user is the owner of the comment or the owner of the review
        if (
          comment.user.toString() === context.user._id.toString() ||
          (comment.review &&
            comment.review.user.toString() === context.user._id.toString())
        ) {
          // If the user is authorized, remove the comment
          await comment.remove();
          return "Comment removed successfully";
        } else {
          throw new AuthenticationError(
            "You are not authorized to remove this comment"
          );
        }
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    addWorm: async (parent, { wormId }, context) => {
      if (context.user) {
        // Ensure the wormId is valid
        const worm = await Worm.findById(wormId);
        if (!worm) {
          throw new Error("Worm not found");
        }

        // Update the user document to add the worm
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { worms: wormId } },
          { new: true }
        ).populate("worms");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeWorm: async (parent, { wormId }, context) => {
      if (context.user) {
        // Ensure the wormId is valid
        const worm = await Worm.findById(wormId);
        if (!worm) {
          throw new Error("Worm not found");
        }

        // Update the user document to remove the worm
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { worms: wormId } }, // Use $pull to remove the wormId from the worms array
          { new: true }
        ).populate("worms");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
