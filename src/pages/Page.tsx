import './Page.css';

import {
	IonButtons,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import ExploreContainer from '../components/ExploreContainer';
import Loading from '../components/loading/loading';

const Page: React.FC = () => {
	let { name } = useParams<{ name: string }>();
	name = name.charAt(0).toUpperCase() + name.slice(1);

	const [showLoading, setShowLoading] = useState<boolean>(true);

	// const loginContext = useContext(LoginContext);

	// const [validate] = useValidateTokenLazyQuery({
	//   fetchPolicy: 'network-only',
	//   onCompleted: (response) => {
	//     console.log(response);
	//   },
	//   onError: (err) => {
	//     console.log(err);
	//   }
	// })

	// useEffect(() => {
	//   loginContext.updateDisabled(false);
	//   validate();
	// }, [])

	setTimeout(() => {
		setShowLoading(false);
	}, 2000);

	return (
		<IonPage>
			{showLoading ? <Loading /> : void 0}
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{name}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{name}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name={name} />
			</IonContent>
		</IonPage>
	);
};

export default Page;
