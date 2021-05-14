import express from 'express';
import { ApolloServer } from "apollo-server-express";
import Database from './utils/database';
import http from 'http';

import resolvers from './resolvers';
import schemas from './schemas';

const port = 4000;
const app = express();
const db = new Database();

const httpServer = http.createServer(app);

const server = new ApolloServer({ 
    typeDefs: schemas,
    resolvers,
  
    context: async (arg) =>
    {
        const conn = await db.connection();

        return { conn };
    },
});

server.installSubscriptionHandlers(httpServer);

app.use(server.getMiddleware({ path: "/api/v1" }));

app.get('/', (req, res) => res.json({ success: true }));

httpServer.listen({ port }, () =>
{
    console.log("running....")
});
