import { r } from 'rethinkdb-ts';

const updateUser = async (root: any, args: any, context: any) =>
{
    const updatedUser =
    {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        updated: Date.now()
    }

    await r.db('User')
    .table('users')
    .get(args.id)
    .update(updatedUser)
    .run(context.conn)
    .then((data : any) =>
    {
        console.log('Entry updated: ', data)
    })

    return updatedUser;
}

export default updateUser;
