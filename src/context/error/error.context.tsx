import './error.scss';

import { IonToast } from '@ionic/react';
import React, { useState } from 'react';

type ErrorContextType = {
	showMessage: (newError: string) => void;
};

const errorDefaultContext: ErrorContextType = {
	showMessage: () => null,
};

export const ErrorContext = React.createContext<ErrorContextType>(errorDefaultContext);

export const ErrorProvider: React.FC = ({ children }) => {
	const [errorMessage, setErrorMessage] = useState<string>('Error desconocido');
	const [showToast, setShowToast] = useState<boolean>(false);

	const showMessage = (newError: string) => {
		setErrorMessage(newError);
		setShowToast(true);
	};

	return (
		<ErrorContext.Provider value={{ showMessage }}>
			<IonToast
				color="primary"
				position="top"
				isOpen={showToast}
				duration={2000}
				onDidDismiss={() => {
					setShowToast(false);
					setErrorMessage('Error desconocido');
				}}
				message={errorMessage}
			></IonToast>
			{children}
		</ErrorContext.Provider>
	);
};

export const useError = (): ErrorContextType => {
	return React.useContext(ErrorContext);
};
