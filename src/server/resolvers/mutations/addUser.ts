import { r } from 'rethinkdb-ts';

const addUser = async (root: any, args: any, context: any) =>
{
    const newUser =
    {
        email: args.email,
        validated: false,
        created: Date.now()
    }

    await r.db('User')
    .table("users")
    .insert(newUser)
    .run(context.conn)
    .then((data : any) =>
    {
        console.log('Entry created: ', data)
    });

    return newUser;
};

export default addUser;
