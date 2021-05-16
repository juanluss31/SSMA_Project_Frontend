import { ApolloError } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';

import { RefreshTokenMutation } from '../../api/refresh.api';
import {
	LoginMutationVariables,
	MeQuery,
	useLoginMutation,
	useLogoutMutation,
	useMeLazyQuery,
} from '../../generated/graphql';
import { spliPaneSubject } from '../../utils/splitpane.util';
import { setAccessToken, setUserRoles } from '../../utils/userData.util';
import { useUtils } from '../error/utils.context';
import { useRegisterMutation, RegisterMutationVariables } from '../../generated/graphql';
import { useData } from '../data/data.context';

type AuthContextType = {
	isLogged: boolean;
	currentUser?: MeQuery;
	register: (userData: RegisterMutationVariables) => void;
	login: (userData: LoginMutationVariables) => void;
	logout: () => void;
};

const authDefaultContext: AuthContextType = {
	isLogged: false,
	currentUser: undefined,
	register: () => null,
	login: () => null,
	logout: () => null,
};

export const AuthContext = React.createContext<AuthContextType>(authDefaultContext);

export const AuthProvider: React.FC = ({ children }) => {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const { findUsers } = useData();

	const { showToastMessage, dismissLoadingMessage } = useUtils();

	const [getCurrentUser, { data: dataCurrent }] = useMeLazyQuery({
		onCompleted: data => {
			setIsLogged(data.me !== null);
		},
	});

	const [registerMutation] = useRegisterMutation({
		onCompleted: data => {
			showToastMessage(`Se ha registrado el usuario ${data.register.username} `, 'primary');
			findUsers({ companyId: dataCurrent?.me?.company.id! });
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [loginMutation] = useLoginMutation({
		onCompleted: data => {
			console.log(data);
			setAccessToken(data.login.accessToken);
			setUserRoles(data.login.user.roles);
			getCurrentUser();
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [logoutMutation, { client }] = useLogoutMutation({
		onCompleted: () => {
			setAccessToken('');
			setUserRoles(['']);
			setIsLogged(false);
			spliPaneSubject.next(true);
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const register = useCallback(
		(userData: RegisterMutationVariables) => {
			const { username, email, password, firstname, lastname, companyName } = userData;
			registerMutation({
				variables: { username, email, password, firstname, lastname, companyName },
			});
		},
		[registerMutation]
	);

	const login = useCallback(
		(userData: LoginMutationVariables) => {
			const { username, password } = userData;
			loginMutation({ variables: { username, password } }).then(() => {
				dismissLoadingMessage();
			});
		},
		[dismissLoadingMessage, loginMutation]
	);

	const logout = useCallback(() => {
		logoutMutation().then(() => {
			dismissLoadingMessage();
		});
	}, [dismissLoadingMessage, logoutMutation]);

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
		<AuthContext.Provider value={{ isLogged, currentUser: dataCurrent, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	return React.useContext(AuthContext);
};
