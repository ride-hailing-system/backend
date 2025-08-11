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
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import { deleteFile, uploadFile } from './service/file';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: true, credentials: true }));
app.use(cors({
  origin: [
  "http://localhost:4000",
  "https://ride-hailing-backend.vercel.app"
  ],
  credentials: true
}));
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

const supabaseUrl = "https://sbclwswlxlrtswaknshk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiY2x3c3dseGxydHN3YWtuc2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTQ2NTQsImV4cCI6MjA3MDMzMDY1NH0.Q2iJuLbwBNQyA_EhZFWV9SIiK6s12SaSkOF2EUy5jow";
const supabase = createClient(supabaseUrl, supabaseKey);

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


app.post("/uploadFile", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const result: Promise<{status: boolean, message: string}> =  uploadFile(req.body.fileName, req.file,supabase, true);

  if (!(await result).status) return res.status(500).json({ error: (await result).message });

  res.json({ url: (await result).message });
});

app.post("/deleteFile", async (req, res) => {
  const fileName = req.body.fileName;
  if (!fileName) return res.status(400).send("file name required");

  const result = await deleteFile(fileName, supabase);

  if (!result.status) return res.status(500).json({ error: result.message });

  res.json({ message: result.message });
});

const PORT = 4000;

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript with Express!');
});

startApolloServer();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default app;
