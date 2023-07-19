import React from 'react';
export interface ListProps {
	children?: JSX.Element | JSX.Element[];
}
export function List(props: ListProps){
	return (
		<div className='w-full h-auto'>
			{props.children}
		</div>
	);
}