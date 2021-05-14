import { gql } from 'apollo-server-express';

import Chat from './Chat';
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';

const schemas = 
[
    Chat,
    Query,
    Mutation, 
    Subscription,
];

export default gql`${ schemas.join('') }`;
