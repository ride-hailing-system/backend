import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLError } from "graphql";
import schema from "./graphql/schema";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mongodbUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://surafelhabte1:yF7snVymyTGv5sGs@cluster0.1phpucp.mongodb.net/";
mongoose
  .connect(mongodbUri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    schema,
    formatError: (err) => {
      if (err instanceof GraphQLError) {
        return {
          message: err.message,
          locations: err.locations,
          path: err.path,
          extensions: err.extensions,
        };
      } else if (err instanceof Error) {
        return new GraphQLError(err.message);
      } else if (typeof err === "object" && err !== null) {
        return { message: err.message || "An unexpected error occurred." };
      } else {
        return { message: "An unexpected error occurred." };
      }
    },
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );
}

startApolloServer();

const PORT = 3000;

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
