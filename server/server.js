const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { expressMiddleware } = require("@apollo/server/express4");

const routes = require("./routes");

//add the Apollo Server
 const { ApolloServer } = require("@apollo/server"); //line line was the old ver.

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3002;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//apply the apollo middleware
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));
  
  console.log(`Using GraphQL at http://localhost:${PORT}/graphql}`);
  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }
  
  app.use(routes);
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
  
};
db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

startApolloServer();
