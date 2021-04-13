import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import Menu from '../components/menu/Menu';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/login/Login';
import { spliPaneSubject } from '../utils/splitpane.util';

export const Routes: React.FC = () => {
	const [disabled, setDisabled] = useState<boolean>(true);

	console.log('Estas escondido? ', disabled);

	useEffect(() => {
		spliPaneSubject.asObservable().subscribe((newState: boolean) => {
			setDisabled(newState);
		});
	}, []);

	return (
		<IonSplitPane contentId="main" disabled={disabled} when="md">
			<Menu />
			<IonRouterOutlet id="main">
				<Route path="/" exact={true}>
					<Redirect to="/login" />
				</Route>
				<Route path="/login" exact={true}>
					<Login />
				</Route>
				<Route path="/page/:name" exact={true}>
					<Dashboard />
				</Route>
			</IonRouterOutlet>
		</IonSplitPane>
	);
};
