import axios from 'axios';
import { setAccessToken } from '../utils/token.util';

export interface RefreshTokenResponse {
	ok: boolean;
	message?: string;
	accessToken?: string;
}

const formatError = (message: string): string =>
	`Failed refresh token operation: ${message ? `${message}.` : ''} Try to relogin`;

export const RefreshTokenMutation = async (): Promise<RefreshTokenResponse> => {
	const endpoint = `http://localhost:3000/auth/refresh-token`;

	try {
		const { data } = await axios.post<RefreshTokenResponse>(
			endpoint,
			{},
			{
				withCredentials: true,
			}
		);

		if (!data.accessToken || !data.ok) {
			const errorMessage = formatError(data.message ?? '');
			return {
				ok: false,
				message: errorMessage,
				accessToken: '',
			};
		}

		setAccessToken(data.accessToken);

		return data;
	} catch (err) {
		const { response } = err;
		const message = response?.data?.message;
		const errorMessage = formatError(message ?? err.message);
		return {
			ok: false,
			message: errorMessage,
			accessToken: '',
		};
	}
};
