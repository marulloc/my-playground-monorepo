import { gql, useQuery } from '@apollo/client';

const ALL_TWEETS = gql`
    query getAllMovies {
        allTweets {
            id
            text
        }
    }
`;

const Tweets = () => {
    // const client = useApolloClient();
    // const [tweets, setTweets] = useState([]);

    const { data, loading, error } = useQuery(ALL_TWEETS);

    // useEffect(() => {
    //     (async () => {
    //         const { data } = await client.query({
    //             query: gql`
    //                 {
    //                     allTweets {
    //                         id
    //                         text
    //                     }
    //                 }
    //             `,
    //         });
    //         setTweets(data.allTweets);
    //     })();
    // }, [client]);

    if (loading) return <h1>Loading </h1>;
    if (error) return <h1>Error</h1>;
    return (
        <section>
            <ul>
                {data.allTweets.map((tweet) => (
                    <li key={tweet?.id}>
                        <p>{tweet?.text}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Tweets;
