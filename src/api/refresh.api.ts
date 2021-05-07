import axios from 'axios';
import { setAccessToken, setUserRoles } from '../utils/userData.util';

export interface RefreshTokenResponse {
	ok: boolean;
	message?: string;
	accessToken?: string;
	roles?: string[];
}

const formatError = (message: string): string =>
	`Failed refresh token operation: ${message ? `${message}.` : ''} Try to relogin`;

export const RefreshTokenMutation = async (): Promise<RefreshTokenResponse> => {
	// const endpoint = `http://localhost:3000/auth/refresh-token`;
	const endpoint = `https://tfg-people-counter.herokuapp.com/auth/refresh-token`;

	try {
		const { data } = await axios.post<RefreshTokenResponse>(
			endpoint,
			{},
			{
				withCredentials: true,
				headers: { 'Access-Control-Allow-Origin': '*' },
			}
		);

		if (!data.accessToken || !data.ok || !data.roles) {
			const errorMessage = formatError(data.message ?? '');
			return {
				ok: false,
				message: errorMessage,
				accessToken: '',
			};
		}

		setAccessToken(data.accessToken);
		setUserRoles(data.roles);

		return data;
	} catch (err) {
		const { response } = err;
		const message = response?.data?.message;
		const errorMessage = formatError(message ?? err.message);
		return {
			ok: false,
			message: errorMessage,
			accessToken: '',
			roles: [''],
		};
	}
};
