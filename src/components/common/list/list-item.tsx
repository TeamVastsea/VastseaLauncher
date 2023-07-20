import React from 'react';

export interface ListItemProps {
	children: React.ReactNode
}
export function ListItem(props: ListItemProps){
	return (
		<div className='w-full h-full hover:bg-slate-100 px-2 py-3 rounded-md cursor-pointer box-border'>
			{props.children}
		</div>
	);
}