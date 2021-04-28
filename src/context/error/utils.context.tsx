import './utils.scss';

import { IonLoading, IonToast } from '@ionic/react';
import React, { useState } from 'react';

type UtilsContextType = {
	showErrorMessage: (newError: string) => void;
	showLoadingMessage: (newMessage: string) => void;
	dismissLoadingMessage: () => void;
};

const utilsDefaultContext: UtilsContextType = {
	showErrorMessage: () => null,
	showLoadingMessage: () => null,
	dismissLoadingMessage: () => null,
};

export const UtilsContext = React.createContext<UtilsContextType>(utilsDefaultContext);

export const UtilsProvider: React.FC = ({ children }) => {
	const [errorMessage, setErrorMessage] = useState<string>('Error desconocido');
	const [showToast, setShowToast] = useState<boolean>(false);
	const [loadingMessage, setLoadingMessage] = useState<string>('Espere por favor...');
	const [showLoading, setShowLoading] = useState<boolean>(false);

	const showErrorMessage = (newError: string) => {
		setErrorMessage(newError);
		setShowToast(true);
	};

	const showLoadingMessage = (newMessage: string) => {
		if (newMessage !== '') setLoadingMessage(newMessage);
		setShowLoading(true);
	};

	const dismissLoadingMessage = () => {
		setShowLoading(false);
		setLoadingMessage('Espere por favor...');
	};

	return (
		<UtilsContext.Provider value={{ showErrorMessage, showLoadingMessage, dismissLoadingMessage }}>
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
			/>
			<IonLoading isOpen={showLoading} message={loadingMessage} />
			{children}
		</UtilsContext.Provider>
	);
};

export const useUtils = (): UtilsContextType => {
	return React.useContext(UtilsContext);
};
