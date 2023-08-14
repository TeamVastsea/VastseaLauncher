import React from 'react';
import { RouterGuard, routes } from './router';
import { useRoutes } from 'react-router-dom';
import { useMount } from 'ahooks';
export default function App(){
	const elements = useRoutes(routes);
	useMount(()=>{
		document.addEventListener('copy', e => e.preventDefault());
	});
	return (
		<RouterGuard>
			{elements}
		</RouterGuard>
	);
}