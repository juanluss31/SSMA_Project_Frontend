import './Login.scss';

import { IonContent, IonPage, IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import LoginForm from '../../components/loginForm/LoginForm';
import { useAuth } from '../../context/auth.context';
import { LoginMutationVariables } from '../../generated/graphql';
import background from '../../img/login_background.jpg';

const Login: React.FC = () => {
	const [credentials, setCredentials] = useState<LoginMutationVariables>({
		username: '',
		password: '',
	});
	const [showToast, setShowToast] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	const { isLogged, login } = useAuth();

	useEffect(() => {
		if (credentials.username !== '' && credentials.password !== '') {
			login(credentials);
		}
	}, [credentials]);

	useEffect(() => {
		if (message !== '') {
			setShowToast(true);
		}
	}, [message]);

	if (isLogged) {
		// history.push('/page/dashboard');
		return <Redirect to="/page/Dashboard" />;
	}

	return (
		<IonPage style={{ backgroundImage: background }}>
			<IonContent fullscreen className="loginContent">
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
