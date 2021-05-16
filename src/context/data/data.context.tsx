import { ApolloError } from '@apollo/client';
import React, { useState, useEffect, useCallback } from 'react';
import {
	useFindCompanyUsersLazyQuery,
	FindCompanyUsersQueryVariables,
} from '../../generated/graphql';
import { useUtils } from '../error/utils.context';
import { useUpdateUserMutation, UpdateUserMutationVariables } from '../../generated/graphql';
import { useAuth } from '../auth/auth.context';
import {
	UserModel,
	useDeleteUserMutation,
	DeleteUserMutationVariables,
} from '../../generated/graphql';

type DataContextType = {
	findUsers: (companyData: FindCompanyUsersQueryVariables) => void;
	updateUser: (userData: UpdateUserMutationVariables) => void;
	deleteUser: (userData: DeleteUserMutationVariables) => void;
	usersData?: UserModel[];
};

const utilsDefaultContext: DataContextType = {
	findUsers: () => null,
	updateUser: () => null,
	deleteUser: () => null,
	usersData: undefined,
};

export const DataContext = React.createContext<DataContextType>(utilsDefaultContext);

export const DataProvider: React.FC = ({ children }) => {
	const { showToastMessage, dismissLoadingMessage } = useUtils();
	const [usersData, setUsersData] = useState<UserModel[]>([]);
	const { currentUser } = useAuth();

	useEffect(() => {
		dismissLoadingMessage();
	}, [dismissLoadingMessage, usersData]);

	const [getUsers] = useFindCompanyUsersLazyQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			console.log('Adasd', data.findCompanyUsers);
			setUsersData(data.findCompanyUsers);
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [updateUserMutation] = useUpdateUserMutation({
		onCompleted: data => {
			showToastMessage(`El usuario ${data.update.username} ha sido actualizado`, 'primary');
			getUsers({ variables: { companyId: currentUser?.me?.company.id! } });
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [deleteUserMutation] = useDeleteUserMutation({
		onCompleted: data => {
			showToastMessage(
				`El usuario ${data.delete.username} ha sido eliminado correctamente`,
				'primary'
			);
			getUsers({ variables: { companyId: currentUser?.me?.company.id! } });
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const findUsers = useCallback(
		(companyData: FindCompanyUsersQueryVariables) => {
			const { companyId } = companyData;
			getUsers({ variables: { companyId } });
		},
		[getUsers]
	);

	const updateUser = useCallback(
		(userData: UpdateUserMutationVariables) => {
			const { username, newUsername, newEmail, newFirstname, newLastname } = userData;
			updateUserMutation({
				variables: { username, newUsername, newEmail, newFirstname, newLastname },
			});
		},
		[updateUserMutation]
	);

	const deleteUser = useCallback(
		(userData: DeleteUserMutationVariables) => {
			const { userId } = userData;
			deleteUserMutation({ variables: { userId } });
		},
		[deleteUserMutation]
	);

	return (
		<DataContext.Provider value={{ usersData, findUsers, updateUser, deleteUser }}>
			{children}
		</DataContext.Provider>
	);
};

export const useData = (): DataContextType => {
	return React.useContext(DataContext);
};
