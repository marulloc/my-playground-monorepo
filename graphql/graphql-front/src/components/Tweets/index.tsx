import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

const Tweets = () => {
    const client = useApolloClient();
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await client.query({
                query: gql`
                    {
                        allTweets {
                            id
                            text
                        }
                    }
                `,
            });
            setTweets(data.allTweets);
        })();
    }, [client]);

    return (
        <section>
            <ul>
                {tweets.map((tweet) => (
                    <li key={tweet?.id}>
                        <p>{tweet?.text}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Tweets;
