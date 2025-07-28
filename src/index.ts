import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { GraphQLError } from 'graphql';
import schema from './graphql/schema';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.body && process.env.NODE_ENV !== "production") {
      req.body = {}; // Prevent Apollo from failing on undefined/null req.body
  }
  next();
});

// mangodb db username: admin
// mangodb db password: W3wWlMOGHZ3oP2OL
const mongodbUri: any = process.env.MONGODB_URI || 'mongodb://localhost:27017/ridehailing';

mongoose
  .connect(mongodbUri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
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
      } else if (typeof err === 'object' && err !== null) {
        return { message: err.message || 'An unexpected error occurred.' };
      } else {
        return { message: 'An unexpected error occurred.' };
      }
    },
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    // cors({ origin: true, credentials: true }),
    // bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
}

const PORT = 4000;

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript with Express!');
});

startApolloServer();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
