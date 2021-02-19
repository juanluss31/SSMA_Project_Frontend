import { IonLoading } from "@ionic/react";

const Loading: React.FC = () => {

    return(
        <IonLoading
            isOpen={true}
            message={'Cargando...'}
        />
    )
}

export default Loading;