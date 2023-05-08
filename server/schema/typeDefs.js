const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id:ID!
    name: String!
  }

  input CategoryInput {
  name: String!
}

type Budget {
  _id: ID!
  category: Category!
  amount: Float!
}


# input BudgetInput {
#   category: String!
#   amount: Float!
#  }

  type Item {
  _id: ID!
  date: String!
  city: String!
  hotel: String!
  details: String
  budgets: [Budget!]!
  totalBudget: Float
}

# input ItemInput {
#   date: String!
#   city: String!
#   hotel: String!
#   details: String
#   budgets: [BudgetInput!]!
}

  type Query {
    users: [User]
    user(username: String!): User
    categories:[Category]!
    items: [Item!]!
    item(_id: ID!): Item!
    budgets: [Budget!]!
    budget(_id: ID!): Budget!
  }

  ttype Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addItem(date: String!, city: String!, hotel: String!, details: String, budgets: [BudgetInput!]!): Item
    addBudget(itemId: ID!, category: String!, amount: Float!): Item
    deleteItem(id: ID!): Item
    updateItem(id: ID!, date: String!, city: String!, hotel: String!, details: String, budgets: [BudgetInput!]!): Item 
  }

`;

module.exports = typeDefs;