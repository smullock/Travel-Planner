const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const PORT = process.env.PORT || 3001;
// const path = require('path');
// const { authMiddleware } = require('./utils/auths')


const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');


const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();

