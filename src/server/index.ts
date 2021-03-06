import express, { Application, Request, Response } from 'express';
import { ApolloServer } from "apollo-server-express";
import Database from './utils/database';
import http, { Server } from 'http';

import resolvers from './resolvers';
import schemas from './schemas';

// const app = express();
// const db = new Database();

// const httpServer = new http.Server(app);

// const server = new ApolloServer({ 
//     typeDefs: schemas,
//     resolvers,
  
//     context: async (arg) =>
//     {
//         const conn = await db.connection();

//         return { conn };
//     },
// });

// server.installSubscriptionHandlers(httpServer);

// app.use(server.getMiddleware({ path: "/api/v1" }));

// app.get('/', (req, res) => res.json({ success: true }));

// httpServer.listen({ port }, () =>
// {
//     console.log("running....")
// });

class App
{
    serviceName : string;
    servicePort : number;
    app: Application;
    httpServer: Server;
    apolloServer: any;
    database : Database;

    constructor()
    {
        this.serviceName = "hello";
        this.servicePort = 4000;
        this.app = express();
        this.database = new Database();
        this.httpServer = new http.Server(this.app);
        this.apolloServer = new ApolloServer({ 
            typeDefs: schemas,
            resolvers,
            context: async (arg) =>
            {
                const conn = await this.database.connection();

                return { conn };
            },
        });

        


        this.httpServer.listen({ port: this.servicePort }, () =>
        {
            console.log("running....")
        });

        this.init();
    }

    init = async () =>
    {
        await this.middleware();
        await this.routes();
    }

    middleware = () =>
    {
        this.apolloServer.installSubscriptionHandlers(this.httpServer);

        this.app.use(this.apolloServer.getMiddleware({ path: "/api/v1" }));
    }

    routes = () =>
    {

        this.app.get('/', (req : Request, res : Response) => res.json({ success: true }));
    }
}

const app = new App();

// app.init();

export default app;
