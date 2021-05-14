import { r } from 'rethinkdb-ts';
import RethinkIterator from './../utils/iterator';

export default
{
    chatAdded:
    {
        subscribe: async (parent: any, args: any, context: any, info: any) =>
        {
            return new RethinkIterator(
                r.table('chats')
                .filter({ roomId: args.room }),
                context.conn,
            );
        },
    },
}
