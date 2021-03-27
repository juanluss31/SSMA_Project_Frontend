let accessToken = '';

export const getAccessToken = (): string => {
	return accessToken;
};

export const setAccessToken = (newToken: string) => {
	accessToken = newToken;
};
