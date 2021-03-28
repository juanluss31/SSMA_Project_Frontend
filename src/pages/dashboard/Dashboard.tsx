import './Dashboard.scss';

import { IonContent, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ExploreContainer from '../../components/ExploreContainer';
import { spliPaneSubject } from '../../utils/splitpane.util';

const Dashboard: React.FC = () => {
	const name =
		useParams<{ name: string }>().name.charAt(0).toUpperCase() +
		useParams<{ name: string }>().name.slice(1);

	useEffect(() => {
		spliPaneSubject.next(false);
	}, []);

	const [showLoading, setShowLoading] = useState<boolean>(true);

	setTimeout(() => {
		setShowLoading(false);
	}, 2000);

	const componentSwitch = () => {
		switch (name) {
			case 'Inbox':
				return <ExploreContainer name="Página de Inbox" />;
			case 'Outbox':
				return <ExploreContainer name="Página de Outbox" />;
			case 'Favorites':
				return <ExploreContainer name="Página de Favorites" />;
			case 'Archived':
				return <ExploreContainer name="Página de Archived" />;
			case 'Trash':
				return <ExploreContainer name="Página de Trash" />;
			case 'Spam':
				return <ExploreContainer name="Página de Spam" />;
			default:
				return <ExploreContainer name="Página de Dashboard" />;
		}
	};

	return (
		<IonPage>
			<IonContent fullscreen>{componentSwitch()}</IonContent>
		</IonPage>
	);
};

export default Dashboard;
