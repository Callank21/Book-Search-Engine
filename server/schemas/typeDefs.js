const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

type Book {
    authors: [String]
    description: String
    bookId: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
  }

  # Query 
type Query {
  me: User
}

# Input
input bookInput {
  authors: [String]
    description: String
    bookId: String
    title: String
    image: String
    link: String
}

  # Mutations
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(Book: bookInput!): User
  removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;
