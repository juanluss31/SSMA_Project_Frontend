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
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';

import { Routes } from './routes/Routes';
import { getAccessToken, setAccessToken } from './utils/token.util';
import { RefreshTokenMutation } from './api/refresh.api';
import { AuthProvider } from './context/auth.context';

const App: React.FC = () => {
	const [disabled, setDisabled] = useState<boolean>(true);

	const updateDisabled = (value: boolean) => {
		setDisabled(value);
	};

	const httpLink = createHttpLink({
		uri: 'http://localhost:3000/graphql',
		credentials: 'include',
	});

	const authLink = setContext((_, { headers }) => {
		const accessToken = getAccessToken();
		console.log('Nuevo contexto');

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
			console.log('Se revisa el token');
			const token = getAccessToken();

			if (!token) {
				console.log('Es undefined');
				return true;
			}

			try {
				const { exp } = jwtDecode(token) as { exp: number };
				if (Date.now() >= exp * 1000) {
					console.log('Ha expirado');
					return false;
				}
				console.log('Es valido');
				return true;
			} catch (e) {
				console.log('Error');
				return false;
			}
		},
		fetchAccessToken: async () => {
			const response = await RefreshTokenMutation();

			return new Response(JSON.stringify(response));
		},
		handleFetch: (accessToken: string) => {
			setAccessToken(accessToken);
		},
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
					<IonSplitPane contentId="main" disabled={disabled}>
						<AuthProvider>
							<Routes />
						</AuthProvider>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		</ApolloProvider>
	);
};

export default App;
