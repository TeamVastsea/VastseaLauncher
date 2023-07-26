import React from 'react';
export default function Warning({className, fill}: {className: string, fill: string}){
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
			<mask id="mask0_18_103" style={
				{
					'maskType': 'alpha'
				}
			} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
				<rect width="24" height="24"/>
			</mask>
			<g mask="url(#mask0_18_103)">
				<path d="M1 21L12 2L23 21H1ZM4.45 19H19.55L12 6L4.45 19ZM12 18C12.2833 18 12.5208 17.9042 12.7125 17.7125C12.9042 17.5208 13 17.2833 13 17C13 16.7167 12.9042 16.4792 12.7125 16.2875C12.5208 16.0958 12.2833 16 12 16C11.7167 16 11.4792 16.0958 11.2875 16.2875C11.0958 16.4792 11 16.7167 11 17C11 17.2833 11.0958 17.5208 11.2875 17.7125C11.4792 17.9042 11.7167 18 12 18ZM11 15H13V10H11V15Z" fill={fill}/>
			</g>
		</svg>
	);
}