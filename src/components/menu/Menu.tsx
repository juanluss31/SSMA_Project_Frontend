import './Menu.scss';

import {
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuToggle,
	IonToolbar,
} from '@ionic/react';
import {
	archiveOutline,
	barChartOutline,
	heartOutline,
	paperPlaneOutline,
	trashOutline,
	warningOutline,
} from 'ionicons/icons';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../context/auth.context';
import image from '../../img/team.png';

interface AppPage {
	url: string;
	icon: string;
	title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Vista general',
		url: '/page/Dashboard',
		icon: barChartOutline,
	},
	// {
	// 	title: 'Outbox',
	// 	url: '/page/Outbox',
	// 	icon: paperPlaneOutline,
	// },
	// {
	// 	title: 'Favorites',
	// 	url: '/page/Favorites',
	// 	icon: heartOutline,
	// },
	// {
	// 	title: 'Archived',
	// 	url: '/page/Archived',
	// 	icon: archiveOutline,
	// },
	// {
	// 	title: 'Trash',
	// 	url: '/page/Trash',
	// 	icon: trashOutline,
	// },
	// {
	// 	title: 'Spam',
	// 	url: '/page/Spam',
	// 	icon: warningOutline,
	// },
];

// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
	const location = useLocation();

	const { currentUser } = useAuth();

	return (
		<IonMenu contentId="main" type="overlay">
			<IonHeader style={{ marginTop: '5%', textAlign: 'center' }}>
				<IonToolbar>
					<IonImg className="menuImg" src={image} />
					<p style={{ color: 'white' }}>{currentUser?.me?.company.name}</p>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="inbox-list">
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? 'selected' : ''}
									routerLink={appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<IonIcon slot="start" icon={appPage.icon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
