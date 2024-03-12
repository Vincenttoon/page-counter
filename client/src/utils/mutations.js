import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const WRITE_REVIEW = gql`
  mutation WriteReview($reviewText: String!, $rating: Float!, $bookId: ID!) {
    writeReview(reviewText: $reviewText, rating: $rating, bookId: $bookId) {
      _id
      reviewText
      rating
      createdAt
      book {
        _id
        authors
        description
        title
        image
        link
        averageRating
        pageCount
      }
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        title
        image
        link
        averageRating
        pageCount
      }
      reviews {
        _id
        reviewText
        rating
        createdAt
        book {
          _id
          authors
          description
          title
          image
          link
          averageRating
          pageCount
        }
        comments {
          _id
          commentBody
          createdAt
          username
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput) {
    saveBook(input: $input) {
      _id
      username
      savedBooksCount
      savedBooks {
        bookId
        authors
        image
        link
        title
        description
        pageCount
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        title
        image
        link
        pageCount
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($reviewId: ID!, $commentBody: String!) {
    addComment(reviewId: $reviewId, commentBody: $commentBody) {
      _id
      user {
        _id
        username
      }
      review {
        _id
        reviewText
        rating
        createdAt
        book {
          _id
          authors
          description
          title
          image
          link
          averageRating
          pageCount
        }
      }
      text
      createdAt
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId)
  }
`;

export const ADD_WORM = gql`
  mutation AddWorm($wormId: ID!) {
    addWorm(wormId: $wormId) {
      _id
      username
      email
      worms {
        _id
      }
    }
  }
`;

export const REMOVE_WORM = gql`
  mutation RemoveWorm($wormId: ID!) {
    removeWorm(wormId: $wormId) {
      _id
      username
      email
      worms {
        _id
      }
    }
  }
`;
