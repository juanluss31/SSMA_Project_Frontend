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
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import AvatarPopover from '../../components/avatarPopover/AvatarPopover';
import GraphicsContainer from '../../components/graphicsContainer/GraphicsContainer';
import { useAuth } from '../../context/auth/auth.context';
import user from '../../img/defaultUser.png';
import { spliPaneSubject } from '../../utils/splitpane.util';
import { useLocation } from 'react-router-dom';
import UserForm from '../../components/userForm/UserForm';

const Dashboard: React.FC = () => {
	const { currentUser } = useAuth();

	const name = useLocation().pathname;

	console.log(name);

	useEffect(() => {
		spliPaneSubject.next(false);
	}, []);

	const [showPopover, setShowPopover] = useState<{ open: boolean; event: undefined }>({
		open: false,
		event: undefined,
	});

	const componentSwitch = () => {
		switch (name) {
			case '/page/Dashboard':
				return <GraphicsContainer />;
			case '/page/admin/users':
				return <UserForm />;
			// return <ExploreContainer name="Página de Outbox" />;
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
						className="customChip"
						onClick={(e: any) => {
							setShowPopover({
								open: true,
								event: e,
							});
						}}
					>
						<IonAvatar style={{ width: '30px', height: '30px' }}>
							<img src={user} alt="user avatar" />
						</IonAvatar>
						<IonLabel>{currentUser?.me?.firstname + ' ' + currentUser?.me?.lastname}</IonLabel>
					</IonChip>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="contentBackground">
				{componentSwitch()}
			</IonContent>
			<AvatarPopover isOpen={showPopover} setIsOpen={setShowPopover} />
		</IonPage>
	);
};

export default Dashboard;
