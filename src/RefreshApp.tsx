import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes } from './routes/Routes';

const RefreshApp: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		axios.post('http://localhost:3000/auth/refresh-token', {}, { withCredentials: true });
	}, []);

	return <Routes />;
};

export default RefreshApp;
