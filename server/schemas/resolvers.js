const { User } = require('../models');
const { AuthenticationError} = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user){
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError("You need to log in.")
        }
    },


    Mutation: {
        login: async (parent, {email, password}) => {
            const userData = await User.findOne({email});
            if (!userData){
                throw new AuthenticationError("login failed");
            }

            const checkPassword = await user.isCorrectPassword(password);

            if (!checkPassword){
                throw new AuthenticationError("Wrong password");
            }
            const token = signToken(user);
            return {token, user};
        },

        addUser: async (parent, args) => {
            const userData = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },

        saveBook: async (parent, {newBook}, context) => {
            if (context.user){
                const userData = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: newBook }},
                    {new: true}
                );

                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },

        removeBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const userData = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                );

                return userData;
            }
            throw new AuthenticationError("Not logged in");
        }
    }
};

module.exports = resolvers;