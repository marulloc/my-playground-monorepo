import { ApolloServer, gql } from 'apollo-server';

// Type Explain to GQL(apollo Server)
const typeDefs = gql`
    type User {
        id: ID
        username: String
    }

    type Tweet {
        id: ID
        text: String
        author: User
    }

    type Query {
        allTweets: [Tweet]
        tweet(id: ID): Tweet
    }

    type Mutation {
        postTweet(text: String, userId: ID): Tweet
        deleteTweet(id: ID): Boolean
    }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
    console.log('[Server Run]' + url);
});
