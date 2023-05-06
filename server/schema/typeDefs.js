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
    id:ID!
    name: String!
  }

  input CategoryInput {
  name: String!
}

type Budget {
  category: String!
  amount: Float!
  expenses: [Expense!]!
}


input BudgetInput {
  category: String!
  amount: Float!
}

  type Expense {
    amount: Float!
  }

  input ExpenseInput {
    amount: Float!
  }

  type Item {
  _id: ID!
  date: String!
  city: String!
  hotel: String!
  details: String
  budgets: [Budget!]!
  expenses: [Expense!]!
  expenseTotal: Float
  totalBudget: Float
}

input ItemInput {
  date: String!
  city: String!
  hotel: String!
  details: String
  budgets: [BudgetInput!]!
}
  scalar Date

  type Query {
    users: [User]
    user(username: String!): User
    items: [Item!]!
    categories:[Category]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addItem(item: ItemInput!): Item
    deleteItem(id: ID!): Item
    updateItem(id: ID!, item: ItemInput!): Item
    addExpense(itemId: ID!, budgetIndex: Int!, amount: Float!): Item
  }



 
`;

module.exports = typeDefs;