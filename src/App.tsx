import './theme/variables.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IonApp, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useContext, useEffect, useState } from 'react';

import Menu from './components/Menu';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { getAccessToken } from './utils/token.util';
import axios from 'axios';
import { Routes } from './routes/Routes';

/* Core CSS required for Ionic components to work properly */
/* Basic CSS for apps built with Ionic */
/* Optional CSS utils that can be commented out */
/* Theme variables */
//TODO existe una vulneribilidad de un paquete, pero es de una dependencia llamada immer, en la version 8.0.1 se arregla,
// pero la dependencia de react no esta actualizada aun, cuando lo este gg isi.

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3000/graphql/',
// });

// const authLink = setContext( async (_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = await localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

// console.log(authLink);

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),
// })

export const LoginContext = React.createContext({
	updateDisabled: (value: boolean) => {},
});

const App: React.FC = () => {
	const [disabled, setDisabled] = useState<boolean>(true);

	console.log('Hola');

	const updateDisabled = (value: boolean) => {
		setDisabled(value);
	};

	const httpLink = createHttpLink({
		uri: 'http://localhost:3000/graphql/',
		credentials: 'include',
	});

	// const setAuthorizationLink = setContext(async (request, previousContext) => ({
	// 	headers: {
	// 		...previousContext.headers,
	// 		authorization: `Bearer ${await getToken()}`,
	// 	},
	// }));

	const authLink = setContext((_, { headers }) => {
		const accessToken = getAccessToken();

		if (!accessToken) return { headers };

		return {
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		};
	});

	const tokenRefreshLink = new TokenRefreshLink({
		accessTokenField: 'accessToken',
		isTokenValidOrUndefined: () => {
			const token = getAccessToken();

			if (!token) {
				return true;
			}

			try {
				const { exp } = jwtDecode(token) as { exp: number };
				if (Date.now() >= exp * 1000) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		},
		fetchAccessToken: async () => {
			const response = await axios
				.post('http://localhost:3000/auth/refresh-token', {}, { withCredentials: true })
				.then(response => {
					console.log('Se ha completado el axios: ', response);
				});

			return new Response(JSON.stringify(response));
		},
		// eslint-disable-next-line
		handleFetch: () => {},
	});

	const client = new ApolloClient({
		link: from([tokenRefreshLink, authLink, httpLink]),
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<IonApp>
				<IonReactRouter>
					<IonSplitPane contentId="main" disabled={disabled}>
						<Menu />
						<LoginContext.Provider value={{ updateDisabled }}>
							<Routes />
						</LoginContext.Provider>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		</ApolloProvider>
	);
};

export default App;
