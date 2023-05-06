const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Category } = require('../models');
const { signToken } = require('../utils/auths');
const { GraphQLScalarType, Kind } = require('graphql');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    items: async () => {
      const items = await Item.find();
      return items;
    },
     categories: async() =>{
      const categories = await collection.find().toArray();
      return categories;
    } 
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // ast value is always in string format
      }
      return null;
    }
  }),
  Item: {
    expenseTotal: (item) => {
      return item.expenses.reduce((total, expense) => total + expense.amount, 0);
    },
    totalBudget: (item) => {
        return item.budgets.reduce((total, budget) => total + budget.amount, 0);
      },
      
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Create the user - Registration
      const user = await User.create({ username, email, password });
      // Assign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    addItem: async (parent, { date, city, hotel }) => {
      const item = await Item.create({ date, city, hotel });
      return item;
    },
    deleteItem: async (parent, { id }) => {
      const item = await Item.findByIdAndDelete(id);
      return item;
    },
    updateItem: async (parent, { id, date, city, hotel }) => {
      const item = await Item.findByIdAndUpdate(id, { date, city, hotel }, { new: true });
      return item;
    }
  }
};

module.exports = resolvers;

  