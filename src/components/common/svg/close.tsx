import React from 'react';
export default function Close(props: {stroke: string; strokeWidth: string}){
	return (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M13 13L1 1M1 13L13 1" stroke={props.stroke} strokeWidth={props.strokeWidth}/>
		</svg>
	);
}