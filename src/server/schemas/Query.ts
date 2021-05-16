export default
`
type Query
{
    greeting: String
    chats(room: String!): [Chat]

    users: [User]
}
`;
