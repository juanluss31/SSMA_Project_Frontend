import { ApolloError } from '@apollo/client';
import React, { useState, useEffect, useCallback } from 'react';
import {
	useFindCompanyUsersLazyQuery,
	FindCompanyUsersQueryVariables,
} from '../../generated/graphql';
import { useUtils } from '../error/utils.context';
import { UserModel } from '../../generated/graphql';

type DataContextType = {
	findUsers: (companyId: FindCompanyUsersQueryVariables) => void;
	usersData?: UserModel[];
};

const utilsDefaultContext: DataContextType = {
	findUsers: () => null,
	usersData: undefined,
};

export const DataContext = React.createContext<DataContextType>(utilsDefaultContext);

export const DataProvider: React.FC = ({ children }) => {
	const { showErrorMessage, dismissLoadingMessage } = useUtils();
	const [usersData, setUsersData] = useState<UserModel[]>([]);

	useEffect(() => {
		dismissLoadingMessage();
	}, [dismissLoadingMessage, usersData]);

	const [getUsers] = useFindCompanyUsersLazyQuery({
		onCompleted: data => {
			console.log('Adasd', data.findCompanyUsers);
			setUsersData(data.findCompanyUsers);
		},
		onError: (err: ApolloError) => {
			showErrorMessage(err.message);
		},
	});

	const findUsers = useCallback(
		(companyData: FindCompanyUsersQueryVariables) => {
			const { companyId } = companyData;
			getUsers({ variables: { companyId } });
		},
		[getUsers]
	);

	return <DataContext.Provider value={{ usersData, findUsers }}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
	return React.useContext(DataContext);
};
