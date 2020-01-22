import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { render } from 'react-dom';
import { useQuery } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
});

const HSL_KYSELY = gql`
  {
  stops(name: "gransinmäk") {
    name
    stoptimesWithoutPatterns {
        realtimeArrival
        realtimeDeparture
        realtime
        realtimeState
        headsign
        serviceDay
  }
}
}
`;

function muunnos(a, b) {
    var myTime = new Date((a + b) * 1000);

    return (myTime.toLocaleTimeString());

}

function HSL() {
    const { loading, error, data } = useQuery(HSL_KYSELY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return data.stops.map(({ name, stoptimesWithoutPatterns, realtimeArrival, realtimeState, serviceDay, realtime, headsign }) => (
        <div key={name, stoptimesWithoutPatterns, realtimeArrival, realtime, realtimeState, headsign, serviceDay, realtime}>
            <p>
                {name}, {stoptimesWithoutPatterns.map(stoptimesWithoutPatterns => <div><b>{stoptimesWithoutPatterns.headsign}</b>
                    {muunnos(stoptimesWithoutPatterns.serviceDay, stoptimesWithoutPatterns.realtimeArrival)}
                </div>)}
            </p>
        </div>
    ));
}

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>HSL TOIMII SITTENKIN</h2>
            <HSL />
        </div>
    </ApolloProvider>

);

//olet kakkapylly
render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
