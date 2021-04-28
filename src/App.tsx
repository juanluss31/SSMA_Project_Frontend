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
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import React from 'react';

import { RefreshTokenMutation } from './api/refresh.api';
import { AuthProvider } from './context/auth/auth.context';
import { Routes } from './routes/Routes';
import { getAccessToken } from './utils/userData.util';
import { ErrorProvider } from './context/error/error.context';

const App: React.FC = () => {
	const httpLink = createHttpLink({
		uri: 'http://localhost:3000/graphql',
		credentials: 'include',
	});

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
			const response = await RefreshTokenMutation();

			return new Response(JSON.stringify(response));
		},
		handleFetch: () => {},
		handleError: err => {
			console.warn('El token de refresco es invalido, intente volver a iniciar sesión.');
			console.error(err);
		},
	});

	const client = new ApolloClient({
		link: from([tokenRefreshLink, authLink, httpLink]),
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<IonApp>
				<IonReactRouter>
					<ErrorProvider>
						<AuthProvider>
							<Routes />
						</AuthProvider>
					</ErrorProvider>
				</IonReactRouter>
			</IonApp>
		</ApolloProvider>
	);
};

export default App;
