import { r } from 'rethinkdb-ts';

export default
{
    greeting: () => 'Hello GraphQL world!👋',
    chats: async (parent : any, args : any, context : any, info : any) => 
    {
        return await r
        .db('test')
        .table('chats')
        .filter({
            roomId: args.room
        })
        .orderBy(r.desc("ts"))
        .run(context.conn)
        .then((data : any) =>
        {
            return data;
        });
    },

    users: async (parent: any, args : any, context: any, info: any) => 
    {
        return await r
        .db('User')
        .table('users')
        .orderBy(r.desc("created"))
        .run(context.conn)
        .then((data : any) =>
        {
            return data;
        });
    }
};
