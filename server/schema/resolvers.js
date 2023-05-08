const { AuthenticationError } = require('apollo-server-express');
const { User, Item, Category, Budget } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType, Kind } = require('graphql');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({});
      return users;
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username });
      return user;
    },
    categories: async () => {
      const categories = await Category.find({});
      return categories;
    },
    items: async () => {
      const items = await Item.find({});
      return items;
    },
    item: async (parent, { _id }) => {
      const item = await Item.findById(_id);
      return item;
    },
    budgets: async () => {
      const budgets = await Budget.find({});
      return budgets;
    },
    budget: async (parent, { _id }) => {
      const budget = await Budget.findById(_id);
      return budget;
    },

    budget: async (parent, { _id }) => {
      const budget = await Budget.findById(budgetId).populate('item');
    },
  }, // <-- Missing closing brace

  Item: {
    totalBudget: async (item) => {
      const budgets = await Budget.find({ item: item._id });
      return budgets.reduce((total, budget) => total + budget.amount, 0);
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
    addItem: async (parent, { input }) => {
      const newItem = await Item.create(input);
      return newItem;
    },
    addBudget: async (parent, { input }) => {
      const newBudget = await Budget.create(input);
      return newBudget;
    },
    deleteItem: async (parent, { id }) => {
      const item = await Item.findByIdAndDelete(id);
      return item;
    },
    updateItem: async (parent, { id, item }) => {

      const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
      return updatedItem;
    },
    
  },
    

};

module.exports = resolvers;

  