import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import typeDefs from './schema/typeDefs.js';
import resolvers from './resolvers/index.js';
import { contextFactory } from './context.js';

import path from 'path';
import { fileURLToPath } from 'url';


// Create Express + HTTP server
const app = express();
const httpServer = http.createServer(app);

// ✅ Global middleware — MUST be before /graphql
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // <-- built-in JSON parser, not body-parser

// Apollo v4 server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start Apollo and mount it
await server.start();
app.use('/graphql', expressMiddleware(server, { context: contextFactory }));

// Needed to resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the built frontend (React)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));

// Handle React Router routes (send index.html for unknown routes)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Launch
const PORT = process.env.PORT || 4000;
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Apollo Server v4 ready at http://localhost:${PORT}/graphql`);
