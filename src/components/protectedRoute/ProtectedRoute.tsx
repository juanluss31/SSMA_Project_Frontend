import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import { useAuth } from '../../context/auth/auth.context';

interface ProtectedRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, role, ...rest }) => {
	const { isLogged } = useAuth();

	if (!isLogged) {
		return <Route {...rest} render={() => <Redirect to={{ pathname: '/' }} />}></Route>;
	}

	return (
		<Route
			{...rest}
			render={props => (isLogged ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />)}
		></Route>
	);
};

export default ProtectedRoute;
