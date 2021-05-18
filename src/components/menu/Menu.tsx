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
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../context/auth/auth.context';
import image from '../../img/team.png';
import { AppPage, appPages } from '../../routes/Pages';
import { getUserRoles } from '../../utils/userData.util';

const Menu: React.FC = () => {
	const location = useLocation();

	const roles = getUserRoles();
	const { currentUser } = useAuth();

	const [userPages, setUserPages] = useState<AppPage[]>();

	useEffect(() => {
		// Construir array de rutas

		const pages: AppPage[] = [];

		appPages.forEach(appPage => {
			if (roles.includes(appPage.role)) pages.push(appPage);
		});

		setUserPages(pages);
	}, [roles]);

	return (
		<IonMenu contentId="main" type="overlay">
			<IonHeader style={{ marginTop: '5%', textAlign: 'center' }}>
				<IonToolbar>
					<IonImg className="menuImg" src={image} />
					<p style={{ color: 'white' }}>{currentUser?.me?.company?.name}</p>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="inbox-list">
					{userPages?.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? 'selected' : 'notSelected'}
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
