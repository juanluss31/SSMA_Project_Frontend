import './Login.scss';

import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

import LoginForm from '../../components/loginForm/LoginForm';
import { useAuth } from '../../context/auth/auth.context';
import { LoginMutationVariables } from '../../generated/graphql';
import background from '../../img/login_background.jpg';

const Login: React.FC = () => {
	const [credentials, setCredentials] = useState<LoginMutationVariables>({
		username: '',
		password: '',
	});
	const { isLogged, login } = useAuth();

	useEffect(() => {
		if (credentials.username !== '' && credentials.password !== '') {
			login(credentials);
		}
	}, [credentials, login]);

	if (isLogged) {
		// history.push('/page/dashboard');
		return <Redirect to="/page/Dashboard" />;
	}

	return (
		<IonPage style={{ backgroundImage: background }}>
			<IonContent fullscreen className="loginContent">
				<LoginForm setCredentials={setCredentials} />
			</IonContent>
		</IonPage>
	);
};

export default Login;
