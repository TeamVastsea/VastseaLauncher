import React, { ReactNode, useEffect } from 'react';
import Login from './pages/login';
import Home from './pages/home';
import { useLocation, useNavigate } from 'react-router-dom';
interface Route {
	path: string,
	name: string,
	element: ReactNode,
	children?: Route[],
	auth?: boolean
}
export const routes:Route[] = [
	{
		name: 'Home',
		element: <Home />,
		path: '/',
		auth: true,
	},
	{
		name: 'Login',
		element: <Login />,
		path: '/login',
	}
];
const getCurrentRouterMap = (routers: Route[], path: string): Route => {
	for(const router of routers) {
		if(router.path == path) return router;
		if(router.children) {
			const childRouter = getCurrentRouterMap(router.children, path);
			if(childRouter) return childRouter;
		}
	}
	return routes[routes.length -1];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RouterGuard = ({children}: any) => {
	const location = useLocation();
	const navigator = useNavigate();
	const isAuth = true;
	useEffect(()=>{
		const router = getCurrentRouterMap(routes, location.pathname);
		if (router.auth && !isAuth){
			navigator('/login');
		} else {
			navigator(router.path);
		}
	}, [location.pathname]);
	return children;
};
