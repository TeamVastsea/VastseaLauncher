import React from 'react';
import { Info } from './svg';
export interface ButtonProps {
	onClick?: () => void;
	className?: string;
	icon?: React.ReactNode;
	text?: string;
	shadow: 'md' | 'lg';
}
export default function Button(props: ButtonProps){
	const shadow = props.shadow == 'md' ? 'shaodw-[0px_2px_2px_0px_rgba(0, 0, 0, 0.10)]' : 'shaodw-[0px_4px_4px_0px_rgba(0, 0, 0, 0.10)]';
	const className = `
	inline-flex p-3 gap-3 bg-[#f5f5f5] rounded-[10px]
	${shadow}
	${props.className ?? ''}`;
	const icon = props.icon ?? <Info fill='#000' />;
	return (
		<button className={className} onClick={props.onClick}>
			{icon}
			{
				props.text ? <span className='text-base leading-1'>{props.text}</span> : null
			}
		</button>
	);
}