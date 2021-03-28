import { ApolloError } from '@apollo/client';
import React, { useState, useEffect, useCallback } from 'react';
import {
	MeQuery,
	useLoginMutation,
	useLogoutMutation,
	useMeLazyQuery,
	LoginMutationVariables,
} from '../generated/graphql';
import { setAccessToken } from '../utils/token.util';
import { RefreshTokenMutation } from '../api/refresh.api';

type AuthContext = {
	isLogged: boolean;
	currentUser?: MeQuery;
	login: (userData: LoginMutationVariables) => void;
	logout: () => void;
};

const authDefaultContext: AuthContext = {
	isLogged: false,
	currentUser: undefined,
	login: () => null,
	logout: () => null,
};

export const AuthContext = React.createContext<AuthContext>(authDefaultContext);

export const AuthProvider: React.FC = ({ children }) => {
	const [isLogged, setIsLogged] = useState<boolean>(false);

	const [getCurrentUser, { data: dataCurrent }] = useMeLazyQuery({
		onCompleted: data => {
			console.log('Hola', data.me);
			setIsLogged(data.me !== null);
		},
	});

	useEffect(() => {
		console.log('Nuevo valor de isLogged: ', isLogged);
	}, [isLogged]);

	const [loginMutation] = useLoginMutation({
		onCompleted: data => {
			setAccessToken(data.login.accessToken);
			getCurrentUser();
		},
		onError: (err: ApolloError) => {
			//show toast
		},
	});

	const [logoutMutation, { client }] = useLogoutMutation({
		onCompleted: () => {
			setAccessToken('');
			setIsLogged(false);
			client.clearStore();
		},
		onError: (err: ApolloError) => {
			// show toast
		},
	});

	const login = useCallback(
		(userData: LoginMutationVariables) => {
			const { username, password } = userData;
			loginMutation({ variables: { username, password } });
		},
		[loginMutation]
	);

	const logout = useCallback(() => {
		logoutMutation();
	}, [logoutMutation]);

	useEffect(() => {
		RefreshTokenMutation().then(result => {
			if (result.ok) getCurrentUser();
			else return null;
		});
	}, [getCurrentUser]);

	return (
		<AuthContext.Provider value={{ isLogged, currentUser: dataCurrent, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContext => {
	return React.useContext(AuthContext);
};
