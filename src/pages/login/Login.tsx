import { IonContent, IonPage, IonToast } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import LoginForm from '../../components/loginForm/LoginForm';
import { useLoginMutation, useLogoutMutation } from '../../generated/graphql';
import background from '../../img/login_background.jpg';
import { setToken } from '../../utils/storage.util';

import './Login.scss';
import { setAccessToken } from '../../utils/token.util';

interface LoginCredentials {
	username: string;
	password: string;
}

const Login: React.FC = () => {
	const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
	const [showToast, setShowToast] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const history = useHistory();

	useEffect(() => {
		console.log('Credentials changed: ', credentials);
		if (credentials.username !== '' && credentials.password !== '') {
			login();
		}
	}, [credentials]);

	useEffect(() => {
		console.log('Error message');
		if (message !== '') {
			setShowToast(true);
		}
	}, [message]);

	const [login] = useLoginMutation({
		variables: { username: credentials.username, password: credentials.password },
		onCompleted: res => {
			if (res.login) {
				console.log('Se ha completado la query');
				console.log(res);
				// setToken(res.login.accessToken);
				setAccessToken(res.login.accessToken);
				// history.push('/page/dashboard');
			}
		},
		onError: error => {
			// setShowLoading(false);
			console.log('Ha ocurrido el siguiente error: ');
			console.log(error);
			setMessage(error.message);
		},
	});

	const [logout] = useLogoutMutation({
		onCompleted: res => {
			console.log('respuesta del logout ', res);
		},
		onError: err => {
			console.log('El error es ', err);
		},
	});

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
				<button onClick={() => logout()}>Logout</button>
				<LoginForm setCredentials={setCredentials} setMessage={setMessage} />
			</IonContent>
		</IonPage>
	);
};

export default Login;
