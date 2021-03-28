import { IonContent, IonPage, IonToast } from '@ionic/react';
import React, { useState, useEffect, useContext } from 'react';
import LoginForm from '../../components/loginForm/LoginForm';
import { LoginMutationVariables } from '../../generated/graphql';
import background from '../../img/login_background.jpg';

import './Login.scss';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/auth.context';

const Login: React.FC = () => {
	const [credentials, setCredentials] = useState<LoginMutationVariables>({
		username: '',
		password: '',
	});
	const [showToast, setShowToast] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const { isLogged, login } = useAuth();

	const history = useHistory();

	useEffect(() => {
		console.log('Is logged ha cambiado: ', isLogged);
		if (isLogged) {
			history.push('/page/dashboard');
		}
	}, [isLogged]);

	useEffect(() => {
		console.log('Credentials changed: ', credentials);
		if (credentials.username !== '' && credentials.password !== '') {
			login(credentials);
		}
	}, [credentials]);

	useEffect(() => {
		console.log('Error message');
		if (message !== '') {
			setShowToast(true);
		}
	}, [message]);

	return (
		<IonPage style={{ backgroundImage: background }}>
			<IonContent fullscreen>
				<IonToast
					id="toast"
					isOpen={showToast}
					onDidDismiss={() => {
						setShowToast(false);
						setMessage('');
					}}
					message={message}
					duration={1000}
					color="primary"
					position="top"
				/>
				<LoginForm setCredentials={setCredentials} setMessage={setMessage} />
			</IonContent>
		</IonPage>
	);
};

export default Login;
