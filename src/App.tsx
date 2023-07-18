import React from 'react';
import { RouterGuard, routes } from './router';
import { useRoutes } from 'react-router-dom';
export default function App(){
	const elements = useRoutes(routes);
	return (
		<RouterGuard>
			{elements}
		</RouterGuard>
	);
}