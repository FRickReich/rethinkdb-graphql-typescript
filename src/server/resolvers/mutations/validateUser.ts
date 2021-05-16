import { r } from 'rethinkdb-ts';

const validateUser = async (root: any, args: any, context: any) =>
{
    const validatedUser =
    {
        email: args.email,
        validated: true,
        updated: Date.now()
    }

    await r.db('User')
    .table('users')
    .get(args.id)
    .update(validatedUser)
    .run(context.conn)
    .then((data : any) =>
    {
        console.log('Entry updated: ', data)
    })

    return validatedUser;
}

export default validateUser;
