import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      aboutMe
      age
      favoriteGenre
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
      savedBooksCount
      reviews {
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
        reviewedBooksCount
        worms
        wormCount
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      aboutMe
      age
      favoriteGenre
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
      savedBooksCount
      reviews {
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
        reviewedBooksCount
        worms
        wormCount
      }
    }
  }
`;

// Query all users
export const QUERY_ALL_USERS = gql`
  query AllUsers {
    users {
      _id
      username
      email
      aboutMe
      age
      favoriteGenre
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
      savedBooksCount
      reviews {
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
        reviewedBooksCount
        worms
        wormCount
      }
    }
  }
`;

// Query multiple Reviews
export const QUERY_REVIEWS = gql`
  query AllReviews($username: String) {
    reviews(username: $username) {
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
        createdAt
        username
        commentBody
      }
    }
  }
`;

// Query individual review
export const QUERY_REVIEW = gql`
  query review($_id: ID!) {
    review(_id: $_id) {
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
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const GET_SAVED_BOOKS = gql`
  query GetSavedBooks($username: String!) {
    savedBooks(username: $username) {
      bookId
      authors
      description
      title
      image
      link
      averageRating
      pageCount
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query GetUserReviews($username: String!) {
    userReviews(username: $username) {
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
      reviewedBooksCount
      worms
      wormCount
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments {
    comments {
      _id
      commentBody
      createdAt
      username
    }
  }
`;
