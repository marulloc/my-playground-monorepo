import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_TWEET = gql`
    query getTweet($tweetId: ID!) {
        tweet(id: $tweetId) {
            id
            text
        }
    }
`;

const TweetPage = () => {
    const router = useRouter();
    const { tid } = router.query;
    const { data, loading, error } = useQuery(GET_TWEET, {
        variables: { tweetId: tid },
    });

    if (loading) return <h1>loading {tid}</h1>;
    if (error)
        return (
            <h1>
                error {tid} {JSON.stringify(error.graphQLErrors)}
            </h1>
        );

    return (
        <main>
            <h1>{data.tweet.id}</h1>
            <p>{data.tweet.text}</p>
        </main>
    );
};

export default TweetPage;
