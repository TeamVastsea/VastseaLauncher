import React from 'react';
import Button from './button';
export interface ButtonGroupProps {
	children?: ReturnType<typeof Button>[]
	split?: React.ReactNode;
	className?: string;
}
export function ButtonGroup(props: ButtonGroupProps){
	return (
		<div className={`flex last:rounded-r-none gap-3 ${props.className}`}>
			{props.children}
		</div>
	);
}