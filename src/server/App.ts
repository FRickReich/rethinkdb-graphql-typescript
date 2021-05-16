import express, { Application } from 'express';
import { ApolloServer } from "apollo-server-express";
import Database from './utils/database';
import http, { Server } from 'http';

import resolvers from './resolvers';
import schemas from './schemas';

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
        this.database = new Database();

        this.apolloServer.installSubscriptionHandlers(this.httpServer);

        this.app.use(this.apolloServer.getMiddleware({ path: "/api/v1" }));

        this.app.get('/', (req, res) => res.json({ success: true }));

        this.httpServer.listen({ port: this.servicePort }, () =>
        {
            console.log("running....")
        });
    }

    init = async () =>
    {
        await this.middleware();
        await this.routes();
        await this.start();
    }

    middleware = () =>
    {
        this.apolloServer.installSubscriptionHandlers(this.httpServer);

        this.app.use(this.apolloServer.getMiddleware({ path: "/api/v1" }));
    }

    routes = () =>
    {
        this.app.get('/', (req, res) => res.json({ success: true }));
    }

    start = () =>
    {
        this.httpServer.listen({ port: this.servicePort }, () =>
        {
            console.log("running....")
        });
    }
}

export default App;
