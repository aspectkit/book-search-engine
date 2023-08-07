const {gql} = require('apollo-server-express');


const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input inputBook {
        bookId: String
        authors: [String]
        title: String
        description: String
        image: String
        link: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(newBook: inputBook): User
        removeBook(BookId: String!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

`;

module.exports = typeDefs