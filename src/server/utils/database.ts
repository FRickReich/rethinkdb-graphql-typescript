import { r } from 'rethinkdb-ts';

export default class DataBase
{
    dbConnection: any;

    constructor()
    {
        this.dbConnection = null;
    }

    connect = async () =>
    {
        try
        {
            const conn = await r.connect({
                host: 'localhost',
                port: 28015
            });

            conn.on('close', (e) =>
            {
                console.log('Database connection closed: ', e);
                this.dbConnection = null;
            });

            console.log('Database connected');

            this.dbConnection = conn;
            return conn;
        }
        catch (error)
        {
            throw error;
        }
    }

    connection = async () =>
    {
        if (this.dbConnection != null)
        {
            return this.dbConnection;
        }
        
        return await this.connect();
    }
}
