import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/login/Login';
import React, { useContext, useEffect, useState } from 'react';
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useConfigClient } from './utils/clientHook.util';
import { getToken } from './utils/storage.util';
import { Routes } from './routes/Routes';

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
	});

	const setAuthorizationLink = setContext(async (request, previousContext) => ({
		headers: {
			...previousContext.headers,
			authorization: `Bearer ${await getToken()}`,
		},
	}));

	const client = new ApolloClient({
		link: setAuthorizationLink.concat(httpLink),
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
