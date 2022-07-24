import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: bookInput!) {
    saveBook(input: $bookInput) {
        _id
        username
        savedBooks {
            authors
            description
            bookId
            title
            image
            link
        }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(id: $bookId) {
        _id
        username
        savedBooks {
            authors
            description
            bookId
            title
            image
            link
        }
    }
  }
`;