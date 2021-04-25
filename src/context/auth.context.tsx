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
import { Redirect } from 'react-router';
import { spliPaneSubject } from '../utils/splitpane.util';

type AuthContextType = {
	isLogged: boolean;
	currentUser?: MeQuery;
	login: (userData: LoginMutationVariables) => void;
	logout: () => void;
};

const authDefaultContext: AuthContextType = {
	isLogged: false,
	currentUser: undefined,
	login: () => null,
	logout: () => null,
};

export const AuthContext = React.createContext<AuthContextType>(authDefaultContext);

export const AuthProvider: React.FC = ({ children }) => {
	const [isLogged, setIsLogged] = useState<boolean>(false);

	const [getCurrentUser, { data: dataCurrent }] = useMeLazyQuery({
		onCompleted: data => {
			setIsLogged(data.me !== null);
		},
	});

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
			spliPaneSubject.next(true);
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
			else {
				setIsLogged(false);
				return null;
			}
		});
	}, [getCurrentUser]);

	useEffect(() => {
		if (!isLogged) {
			client.stop();
			client.clearStore();
		}
	}, [isLogged, client]);

	return (
		<AuthContext.Provider value={{ isLogged, currentUser: dataCurrent, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	return React.useContext(AuthContext);
};
