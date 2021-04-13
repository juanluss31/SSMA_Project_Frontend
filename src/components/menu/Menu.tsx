import './Menu.scss';

import {
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonToolbar,
} from '@ionic/react';
import {
	archiveOutline,
	archiveSharp,
	heartOutline,
	heartSharp,
	mailOutline,
	mailSharp,
	paperPlaneOutline,
	paperPlaneSharp,
	trashOutline,
	trashSharp,
	warningOutline,
	warningSharp,
} from 'ionicons/icons';
import React from 'react';
import { useLocation } from 'react-router-dom';

import image from '../../img/team.png';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Vista general',
		url: '/page/Dashboard',
		iosIcon: mailOutline,
		mdIcon: mailSharp,
	},
	{
		title: 'Outbox',
		url: '/page/Outbox',
		iosIcon: paperPlaneOutline,
		mdIcon: paperPlaneSharp,
	},
	{
		title: 'Favorites',
		url: '/page/Favorites',
		iosIcon: heartOutline,
		mdIcon: heartSharp,
	},
	{
		title: 'Archived',
		url: '/page/Archived',
		iosIcon: archiveOutline,
		mdIcon: archiveSharp,
	},
	{
		title: 'Trash',
		url: '/page/Trash',
		iosIcon: trashOutline,
		mdIcon: trashSharp,
	},
	{
		title: 'Spam',
		url: '/page/Spam',
		iosIcon: warningOutline,
		mdIcon: warningSharp,
	},
];

// const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
	const location = useLocation();

	return (
		<IonMenu contentId="main" type="overlay">
			<IonHeader>
				<IonToolbar style={{ textAlign: 'center' }}>
					<IonImg className="menuImg" src={image} />
					<p>Nombre de la empresa</p>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="inbox-list">
					{/* <IonListHeader>
						
					</IonListHeader> */}
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
									<IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
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
