import { r } from 'rethinkdb-ts';

const deleteUser = async (root: any, args: any, context: any) =>
{
    await r.db('User')
    .table('users')
    .get(args.id)
    .delete()
    .run(context.conn)
    .then((data : any) =>
    {
        console.log('Entry deleted: ', data)
    })

    return args.id;
};

export default deleteUser;
