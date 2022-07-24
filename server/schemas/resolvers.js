const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password');
  
          return userData;
        }
  
        throw new AuthenticationError('Not logged in');
      }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
  
        return { token, user };
      },
      saveBook: async (parent, { Book }, context) => {
        if (context.user) {
          const user = await User.findOne({ _id: context.user._id });
            user.select('-savedBooks').push(Book);
            return user;
        }
      },
      removeBook: async (parent, { Book }, context) => {
        if (context.user) {
          const user = await User.findOne({ _id: context.user._id });
            user.select('-savedBooks').filter(!Book.bookId);
            return user;
        }
      }
  }
};

module.exports = resolvers;
