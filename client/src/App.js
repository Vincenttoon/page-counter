import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Layout from "./components/Layout";

import Feed from "./pages/Feed";

// create http link to connect to graphQl backend
const httpLink = createHttpLink({
  uri: "http://localhost:3003/graphql",
});

// Set AuthLink to tokens for authorization of logged in users
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create new Apollo client for application, confirm authorization and use http link. Update Cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
            <main className="container">
              <Routes>
                <Route path="" element={<Feed />} />
              </Routes>
            </main>
        </Router>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
