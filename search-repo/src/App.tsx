import React from 'react';
import { Header } from './Header';
import { RepoSearch } from './RepoSearch';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        Authorization: 'bearer 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',
    },
    cache,
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <Header />
                </header>
                <RepoSearch client={client} />
            </div>
        </ApolloProvider>
    );
}

export default App;
