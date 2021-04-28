let accessToken = '';
let userRoles = [''];

export const getAccessToken = (): string => {
	return accessToken;
};

export const setAccessToken = (newToken: string) => {
	accessToken = newToken;
};

export const getUserRoles = (): string[] => {
	return userRoles;
};

export const setUserRoles = (newRoles: string[]) => {
	userRoles = newRoles;
};
