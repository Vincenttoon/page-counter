const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
    savedBooksCount: Int
    reviews: [Review]
    reviewCount: Int
    worms: [User]
    wormCount: Int
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
    pageCount: Int
  }

  type Review {
    _id: ID
    reviewText: String
    rating: Float
    createdAt: String
    book: Book
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID): Review
    savedBooks(username: String!): [Book]
    userReviews(username: String!): [Review]
    comments: [Comment]
  }

  input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
    pageCount: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth!
    addUser(username: String!, email: String!, password: String!): Auth!
    writeReview(reviewText: String!, rating: Float!, bookId: ID!): Review!
    removeReview(reviewId: ID!): User!
    saveBook(input: BookInput): User
    removeBook(bookId: ID!): User
    addComment(bookId: ID!, commentBody: String!): Comment!
    removeComment(commentId: ID!): String!
    addWorm(wormId: ID!): User!
    removeWorm(wormId: ID!): User!
  }
`;

module.exports = typeDefs;
