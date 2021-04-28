import './AvatarPopover.scss';

import { IonIcon, IonItem, IonList, IonPopover } from '@ionic/react';
import { powerOutline } from 'ionicons/icons';
import { useAuth } from '../../context/auth/auth.context';
import { useUtils } from '../../context/error/utils.context';

interface AvatarPopoverProps {
	isOpen: { open: boolean; event: any };
	setIsOpen: Function;
}

const AvatarPopOver: React.FC<AvatarPopoverProps> = ({ isOpen, setIsOpen }) => {
	const { logout } = useAuth();
	const { showLoadingMessage } = useUtils();

	const handleClick = () => {
		showLoadingMessage('Cerrando sesión...');
		logout();
	};

	return (
		<IonPopover
			event={isOpen.event}
			isOpen={isOpen.open}
			onDidDismiss={() => {
				setIsOpen({ open: false, event: undefined });
			}}
		>
			<IonList style={{ width: 'fit-content' }}>
				<IonItem button className="popoverItem" onClick={handleClick}>
					<IonIcon icon={powerOutline} style={{ fontSize: '18px' }} /> &nbsp; Cerrar sesión
				</IonItem>
			</IonList>
		</IonPopover>
	);
};

export default AvatarPopOver;
