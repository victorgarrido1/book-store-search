const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { expressMiddleware } = require("@apollo/server/express4");

const routes = require("./routes");

//add the Apollo Server
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3002;
const app = express();

//apply the apollo middleware
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
console.log(`Using GraphQL athttp://localhost:${PORT}/graphql}`);
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

startApolloServer();
