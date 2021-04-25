import './Dashboard.scss';

import {
	IonAvatar,
	IonChip,
	IonContent,
	IonHeader,
	IonLabel,
	IonMenuButton,
	IonPage,
	IonToolbar,
	useIonPopover,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import GraphicsContainer from '../../components/graphicsContainer/GraphicsContainer';
import { useAuth } from '../../context/auth.context';
import user from '../../img/defaultUser.png';
import { spliPaneSubject } from '../../utils/splitpane.util';
import AvatarPopOver from '../../components/avatarPopOver/AvatarPopOver';

const Dashboard: React.FC = () => {
	const { currentUser, logout } = useAuth();

	const name =
		useParams<{ name: string }>().name.charAt(0).toUpperCase() +
		useParams<{ name: string }>().name.slice(1);

	useEffect(() => {
		spliPaneSubject.next(false);
	}, []);

	const [showLoading, setShowLoading] = useState<boolean>(true);
	// const [showPopOver, hidePopOver] = useIonPopover(AvatarPopOver, {
	// 	onHide: () => hidePopOver(),
	// });
	const [showPopover, setShowPopover] = useState<{ open: boolean; event: undefined }>({
		open: false,
		event: undefined,
	});

	setTimeout(() => {
		setShowLoading(false);
	}, 2000);

	const componentSwitch = () => {
		switch (name) {
			case 'Dashboard':
				return <GraphicsContainer />;
			// case 'Outbox':
			// 	return <ExploreContainer name="Página de Outbox" />;
			// case 'Favorites':
			// 	return <ExploreContainer name="Página de Favorites" />;
			// case 'Archived':
			// 	return <ExploreContainer name="Página de Archived" />;
			// case 'Trash':
			// 	return <ExploreContainer name="Página de Trash" />;
			// case 'Spam':
			// 	return <ExploreContainer name="Página de Spam" />;
			// default:
			// 	return <ExploreContainer name="Página de Dashboard" />;
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonMenuButton slot="start"></IonMenuButton>
					<IonChip
						slot="end"
						style={{ marginRight: '20px' }}
						onClick={(e: any) => {
							// showPopOver({
							// 	event: e.nativeEvent,
							// });
							setShowPopover({
								open: true,
								event: e,
							});
						}}
					>
						<IonAvatar style={{ width: '30px', height: '30px' }}>
							<img src={user} />
						</IonAvatar>
						<IonLabel>{currentUser?.me?.firstname + ' ' + currentUser?.me?.lastname}</IonLabel>
					</IonChip>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="contentBackground">
				{componentSwitch()}
			</IonContent>
			<AvatarPopOver isOpen={showPopover} setIsOpen={setShowPopover} />
		</IonPage>
	);
};

export default Dashboard;
