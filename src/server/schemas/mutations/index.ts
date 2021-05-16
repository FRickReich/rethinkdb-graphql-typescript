import sendChat from './sendChat';
import addUser from './addUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';
import validateUser from './validateUser';

const mutations = 
[
    sendChat,
    addUser,
    updateUser,
    deleteUser,
    validateUser
];

mutations.join('') 
export default
`
type Mutation
{
    ${ mutations }
}
`;
