import { IonRouterOutlet } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Page from '../pages/Page';

export const Routes: React.FC = () => {
	return (
		<IonRouterOutlet id="main">
			<Route path="/" exact={true}>
				<Redirect to="/login" />
			</Route>
			<Route path="/login" exact={true}>
				<Login />
			</Route>
			<Route path="/page/:name" exact={true}>
				<Page />
			</Route>
		</IonRouterOutlet>
	);
};
