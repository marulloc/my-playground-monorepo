import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({});

server.listen().then(({ url }) => {
    console.log('[Server Run]' + url);
});
