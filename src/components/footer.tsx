import React from 'react';
import { NavLink } from 'react-router-dom';
export function Footer(){
	const FooterBlock = ({children}: {children: React.ReactNode}) =>{
		return (
			<div className='text-xl leading-0 -skew-x-6'>
				{children}
			</div>
		);
	};
	const navs = [
		{
			to: '/',
			children: 'Home'
		},
		{
			to: '/news',
			children: 'News'
		},
		{
			to: '/setting',
			children: 'Setting'
		},
	];
	const onMouseEnter = (e: React.MouseEventHandler<HTMLAnchorElement>) => {
		console.log(e);
	};
	return (
		<div className="w-full h-full flex justify-end items-center gap-4 px-4">
			{
				navs.map(({to, children}, idx) => {
					return (
						<FooterBlock key={idx}>
							<NavLink to={to} className={
								({isActive}) => `before:block transition-colors ${isActive ? 'before:w-full before:h-1 before:bg-orange-500 before:absolute before:bottom-0' : ''}`
							} onMouseEnter={console.log}>
								{children}
							</NavLink>
						</FooterBlock>
					);
				})
			}
			<div className='text-4xl leading-0 -skew-x-6 mt-2 self-start'>
				Start
			</div>
		</div>
	);
}