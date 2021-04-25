import { RouteComponentProps, RouteProps, Route, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';

interface ProtectedRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
	const { isLogged } = useAuth();

	return (
		<Route
			{...rest}
			render={props => (isLogged ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
		></Route>
	);
};

export default ProtectedRoute;
