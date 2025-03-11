const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type JournalEntry {
    _id: ID!
    title: String!
    content: String!
    createdAt: String!
    userId: ID!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    getUser: User
    getJournalEntries: [JournalEntry]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJournalEntry(title: String!, content: String!): JournalEntry
    editJournalEntry(id: ID!, title: String!, content: String!): JournalEntry
    deleteJournalEntry(id: ID!): String
  }

  type Quote {
  text: String!
  author: String!
}

extend type Query {
  getRandomQuote: Quote!
}
`;

module.exports = typeDefs;