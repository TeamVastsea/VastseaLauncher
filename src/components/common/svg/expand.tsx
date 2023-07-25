import React from 'react';
export default function Expand({fill, className}: {fill: string, className: string}) {
	return (
		<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<path d="M6 7.70005L0 1.70005L1.4 0.300049L6 4.90005L10.6 0.300049L12 1.70005L6 7.70005Z" fill={fill}/>
		</svg>

	);
}