import {
    ApolloClient, InMemoryCache, HttpLink, split, createHttpLink,
  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
  import { useEffect, useState } from 'react';
import { getToken } from './storage.util';
  
  export const useConfigClient = () => {
    const [authTokenStorage, setAuthTokenStorage] = useState(getStorage());   // by default it is null
      
    const httpLink = createHttpLink({
        uri: 'http://localhost:3000/graphql/',
      });
      
    const authLink = setContext( async (_, { headers }) => {

        return {
            headers: {
            ...headers,
            authorization: authTokenStorage ? `Bearer ${authTokenStorage}` : "",
            }
        }
    });

    async function getStorage(): Promise<string | boolean> {
        return await getToken();
    }

    useEffect(() => {
        setAuthTokenStorage(getStorage());
    }, []);
  
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  
    return client;
  };