import { ApolloServer, gql } from 'apollo-server';

let mockTweets = [
    {
        id: 'tid_1',
        text: 'first tweet',
        userId: 'uid_1',
    },
    {
        id: 'tid_2',
        text: 'second tweet',
        userId: 'uid_1',
    },
    {
        id: 'tid_3',
        text: 'third tweet',
        userId: 'uid_2',
    },
];

let users = [
    {
        id: 'uid_1',
        username: 'first user',
    },
    {
        id: 'uid_2',
        username: 'second user',
    },
];

// Type Explain to GQL(apollo Server)
const typeDefs = gql`
    type User {
        id: ID!
        username: String
        fullname: String
    }

    """
    description~~~~ ?? is it working?
    """
    type Tweet {
        """
        tweet 아이디엔둉
        """
        id: ID!
        text: String!
        author: User
    }

    type Query {
        allUsers: [User]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID): Boolean!
    }
`;

const resolvers = {
    User: {
        fullname() {
            return 'adasasd';
        },
    },
    Tweet: {
        author({ userId }) {
            return users.find((user) => user.id === userId);
        },
    },
    Query: {
        allUsers() {
            return users;
        },
        allTweets() {
            return mockTweets;
        },
        tweet(_root, { id }) {
            return mockTweets.find((tweet) => tweet.id === id);
        },
    },
    Mutation: {
        postTweet(_root, { text, userId }) {
            const newTweet = {
                id: `tid_${mockTweets.length + 1}`,
                text,
            };
            mockTweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_root, { id }) {
            const tweet = mockTweets.find((tweet) => tweet.id === id);
            if (!tweet) return false;
            mockTweets = mockTweets.filter((tweet) => tweet.id !== id);
            return true;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log('[Server Run]' + url);
});
