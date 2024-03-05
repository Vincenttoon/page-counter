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
    averageRating: Float
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
`;
