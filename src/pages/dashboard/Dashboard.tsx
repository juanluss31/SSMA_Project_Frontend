import './Dashboard.scss';

import {
	IonAvatar,
	IonButton,
	IonChip,
	IonContent,
	IonHeader,
	IonLabel,
	IonMenuButton,
	IonPage,
	IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import ExploreContainer from '../../components/ExploreContainer';
import user from '../../img/defaultUser.png';
import { spliPaneSubject } from '../../utils/splitpane.util';
import axios from 'axios';

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
			case 'Dashboard':
				return <ExploreContainer name="Página de Dashboard" />;
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
			<IonHeader>
				<IonToolbar>
					<IonMenuButton slot="start"></IonMenuButton>
					<IonChip slot="end" style={{ marginRight: '20px' }}>
						<IonAvatar style={{ width: '30px', height: '30px' }}>
							<img src={user} />
						</IonAvatar>
						<IonLabel>Nombre del usuario</IonLabel>
					</IonChip>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>{componentSwitch()}</IonContent>
		</IonPage>
	);
};

export default Dashboard;
