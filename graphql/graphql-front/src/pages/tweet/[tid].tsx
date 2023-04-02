import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_TWEET = gql`
    query getTweet($tweetId: ID!) {
        tweet(id: $tweetId) {
            id
            text
            marulloc_test_local_only_field @client
        }
    }
`;

const TweetPage = () => {
    const router = useRouter();
    const { tid } = router.query;
    const { data, loading, error, client } = useQuery(GET_TWEET, {
        variables: { tweetId: tid },
    });

    if (loading) return <h1>loading {tid}</h1>;
    if (error)
        return (
            <h1>
                error {tid} {JSON.stringify(error.graphQLErrors)}
            </h1>
        );

    console.log(data);
    return (
        <main>
            <button
                onClick={() => {
                    client.cache.writeFragment({
                        id: `Tweet:${data.tweet.id}`,
                        fragment: gql`
                            fragment TweetFragment on Tweet {
                                marulloc_test_local_only_field
                            }
                        `,
                        data: {
                            marulloc_test_local_only_field: String(Math.random()),
                        },
                    });
                    // cache에 접근해서 client field를 바꿔주자
                }}
            >
                Set Local Only Field
            </button>
            <h1>{data.tweet.id}</h1>
            <p>{data.tweet.text}</p>
            <h2 style={{ border: '1px solid red' }}>{data.tweet.marulloc_test_local_only_field}</h2>
        </main>
    );
};

export default TweetPage;
