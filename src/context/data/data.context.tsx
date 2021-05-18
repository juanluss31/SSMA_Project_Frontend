import { ApolloError } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';

import {
	CounterModel,
	DeleteUserMutationVariables,
	FindAllCompanyCountersQuery,
	FindAllCompanyCountersQueryVariables,
	FindCompanyUsersQueryVariables,
	FindGraphicsStatisticsQueryVariables,
	FindStatisticsFromCountersQuery,
	FindStatisticsFromCountersQueryVariables,
	StatisticsModel,
	UpdateUserMutationVariables,
	useDeleteUserMutation,
	useFindAllCompanyCountersLazyQuery,
	useFindCompanyUsersLazyQuery,
	useFindGraphicsStatisticsLazyQuery,
	useFindStatisticsFromCountersLazyQuery,
	UserModel,
	useUpdateUserMutation,
} from '../../generated/graphql';
import { useAuth } from '../auth/auth.context';
import { useUtils } from '../error/utils.context';

type DataContextType = {
	findUsers: (companyData: FindCompanyUsersQueryVariables) => void;
	updateUser: (userData: UpdateUserMutationVariables) => void;
	deleteUser: (userData: DeleteUserMutationVariables) => void;
	findCounters: (companyData: FindAllCompanyCountersQueryVariables) => void;
	findStatistics: (statisticsData: FindStatisticsFromCountersQueryVariables) => void;
	findGraphics: (graphicsData: FindGraphicsStatisticsQueryVariables) => void;
	usersData?: UserModel[];
	countersData?: CounterModel[];
	statisticsData?: FindStatisticsFromCountersQuery;
	graphicsData?: StatisticsModel[][];
};

const utilsDefaultContext: DataContextType = {
	findUsers: () => null,
	updateUser: () => null,
	deleteUser: () => null,
	findCounters: () => null,
	findStatistics: () => null,
	findGraphics: () => null,
	usersData: undefined,
	countersData: undefined,
	statisticsData: undefined,
	graphicsData: undefined,
};

export const DataContext = React.createContext<DataContextType>(utilsDefaultContext);

export const DataProvider: React.FC = ({ children }) => {
	const { showToastMessage, dismissLoadingMessage } = useUtils();
	const [usersData, setUsersData] = useState<UserModel[]>([]);
	const [countersData, setCountersData] = useState<CounterModel[]>();
	// TODO cambiar el nombre de esta variable
	const [statisticsData, setStatisticsData] = useState<FindStatisticsFromCountersQuery>();
	const [graphicsData, setGraphicsData] = useState<StatisticsModel[][]>();
	const { currentUser } = useAuth();

	useEffect(() => {
		dismissLoadingMessage();
	}, [dismissLoadingMessage, usersData]);

	const [getUsers] = useFindCompanyUsersLazyQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			// console.log('Adasd', data.findCompanyUsers);
			setUsersData(data.findCompanyUsers);
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [updateUserMutation] = useUpdateUserMutation({
		onCompleted: data => {
			showToastMessage(`El usuario ${data.update.username} ha sido actualizado`, 'primary');
			getUsers({ variables: { companyId: currentUser?.me?.company?.id! } });
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
			getUsers({ variables: { companyId: currentUser?.me?.company?.id! } });
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [findCountersQuery] = useFindAllCompanyCountersLazyQuery({
		onCompleted: data => {
			// console.log('Los contadores recibidos son: ', data.findAllCompanyCounters);
			setCountersData(data.findAllCompanyCounters);
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [findStatisticsQuery] = useFindStatisticsFromCountersLazyQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			// console.log('Las estadisticas de los contadores son: ', data.findStatisticsFromCounters);
			setStatisticsData(data);
		},
		onError: (err: ApolloError) => {
			showToastMessage(err.message, 'danger');
		},
	});

	const [findGraphicsQuery] = useFindGraphicsStatisticsLazyQuery({
		fetchPolicy: 'network-only',
		onCompleted: data => {
			// console.log('Las estadisticas de los contadores son: ', data.findGraphicsStatistics);
			setGraphicsData(data.findGraphicsStatistics);
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

	const findCounters = useCallback(
		(companyData: FindAllCompanyCountersQueryVariables) => {
			const { companyId } = companyData;
			findCountersQuery({ variables: { companyId } });
		},
		[findCountersQuery]
	);

	const findStatistics = useCallback(
		(statisticsData: FindStatisticsFromCountersQueryVariables) => {
			const { countersIds } = statisticsData;
			findStatisticsQuery({ variables: { countersIds } });
		},
		[findStatisticsQuery]
	);

	const findGraphics = useCallback(
		(statisticsData: FindStatisticsFromCountersQueryVariables) => {
			const { countersIds } = statisticsData;
			findGraphicsQuery({ variables: { countersIds } });
		},
		[findGraphicsQuery]
	);

	return (
		<DataContext.Provider
			value={{
				usersData,
				countersData,
				statisticsData,
				graphicsData,
				findUsers,
				updateUser,
				deleteUser,
				findCounters,
				findStatistics,
				findGraphics,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = (): DataContextType => {
	return React.useContext(DataContext);
};
