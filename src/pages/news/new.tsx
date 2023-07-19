import React from 'react';
import Markdown from 'react-markdown';
export interface NewProps {
	content: string;
}
export default function New(props: NewProps){
	return (
		<Markdown className='prose'>
			{props.content}
		</Markdown>	
	);
}