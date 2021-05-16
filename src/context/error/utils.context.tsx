import './utils.scss';

import { IonLoading, IonToast } from '@ionic/react';
import React, { useState } from 'react';

type UtilsContextType = {
	showToastMessage: (newMessage: string, newColor: string) => void;
	showLoadingMessage: (newMessage: string) => void;
	dismissLoadingMessage: () => void;
};

const utilsDefaultContext: UtilsContextType = {
	showToastMessage: () => null,
	showLoadingMessage: () => null,
	dismissLoadingMessage: () => null,
};

export const UtilsContext = React.createContext<UtilsContextType>(utilsDefaultContext);

export const UtilsProvider: React.FC = ({ children }) => {
	const [toastMessage, setToastMessage] = useState<string>('Error desconocido');
	const [messageColor, setMessageColor] = useState<string>('primary');
	const [showToast, setShowToast] = useState<boolean>(false);
	const [loadingMessage, setLoadingMessage] = useState<string>('Espere por favor...');
	const [showLoading, setShowLoading] = useState<boolean>(false);

	const showToastMessage = (newMessage: string, newColor: string) => {
		setToastMessage(newMessage);
		setMessageColor(newColor);
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
		<UtilsContext.Provider value={{ showToastMessage, showLoadingMessage, dismissLoadingMessage }}>
			<IonToast
				color={messageColor}
				position="top"
				isOpen={showToast}
				duration={2000}
				onDidDismiss={() => {
					setShowToast(false);
					setToastMessage('Error desconocido');
					setMessageColor('primary');
				}}
				message={toastMessage}
			/>
			<IonLoading isOpen={showLoading} message={loadingMessage} />
			{children}
		</UtilsContext.Provider>
	);
};

export const useUtils = (): UtilsContextType => {
	return React.useContext(UtilsContext);
};
