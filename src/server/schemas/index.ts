import { gql } from 'apollo-server-express';

import Mutation from './mutations';
import Chat from './Chat';
import Query from './Query';
import Subscription from './Subscription';

import User from './User';

const schemas = 
[
    Mutation,
    Chat,
    Query,
    Subscription,
    User,
];

export default gql`${ schemas.join('') }`;
