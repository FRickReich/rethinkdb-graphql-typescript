import { r } from 'rethinkdb-ts';

const sendChat = async (root : any, args : any, context : any) =>
{
    const chatMsg =
    {
        user: args.user,
        roomId: args.room,
        msg: args.message,
        ts: Date.now(),
    };

    await r.table("chats")
    .insert(chatMsg)
    .run(context.conn)
    .then((data : any) =>
    {
        // console.log('Entry created: ', data)
        
    });

    return chatMsg;
}

export default sendChat;
